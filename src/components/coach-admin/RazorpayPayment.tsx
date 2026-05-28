'use client';

import { useState } from 'react';

const COACHPAGE_DOMAIN = process.env.NEXT_PUBLIC_COACHPAGE_DOMAIN || 'coachpage.in';

export default function RazorpayPayment({
  tenantId,
  plan,
  amount,
  onSuccess,
  onError,
}: {
  tenantId: string;
  plan: string;
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: any) => void;
}) {
  const [loading, setLoading] = useState(false);

  const planNames: Record<string, string> = {
    starter: '₹3,999/year',
    professional: '₹6,999/year',
    institute: '₹9,999/year',
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId,
          plan,
          amount,
          product: 'coachpage',
        }),
      });

      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'CoachPage',
        description: `${planNames[plan] || plan} Subscription`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                tenantId,
                plan,
                product: 'coachpage',
              }),
            });

            const result = await verifyRes.json();

            if (result.success) {
              onSuccess(result.paymentId);
            } else {
              onError(result.error);
            }
          } catch (error) {
            onError(error);
          }
        },
        prefill: {
          name: 'Institute Owner',
          email: '',
          contact: '',
        },
        theme: {
          color: '#1e3a8a',
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
    >
      {loading ? 'Processing...' : `Pay ${planNames[plan] || `₹${amount}`} via Razorpay`}
    </button>
  );
}
