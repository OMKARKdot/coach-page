'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CreditCard, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function BillingPage() {
  const { user } = useAuth();
  const isDemoAuth = typeof window !== 'undefined' && sessionStorage.getItem('demoAuth') === 'true';
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>({
    plan: 'professional',
    plan_start: null,
    plan_expiry: null,
    razorpay_subscription_id: null,
    status: 'trial'
  });

  useEffect(() => {
    async function fetchSubscription() {
      const tenantId = user?.uid || "demo-tenant-id";
      const docRef = doc(db, COLLECTION, tenantId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSubscription({
          plan: data.plan || 'starter',
          plan_start: data.plan_start?.toDate?.(),
          plan_expiry: data.plan_expiry?.toDate?.(),
          razorpay_subscription_id: data.razorpay_subscription_id,
          status: data.status || 'active'
        });
      }
      setLoading(false);
    }
    fetchSubscription();
  }, [user]);

  const plans = [
    {
      name: 'Starter',
      price: '₹3,999/year',
      features: ['Public website', 'All 13 sections', '5 batches', '10 results', '3 faculty', '3 notices', '10 gallery images'],
      color: 'bg-gray-100'
    },
    {
      name: 'Professional',
      price: '₹6,999/year',
      features: ['Everything in Starter', '20 batches', '50 results', '15 faculty', 'Unlimited notices', '30 gallery images', 'Fee structure display', 'YouTube videos (5)', 'Testimonials', 'WhatsApp notifications'],
      color: 'bg-blue-600 text-white',
      current: true
    },
    {
      name: 'Institute Pro',
      price: '₹9,999/year',
      features: ['Everything in Professional', 'Unlimited batches/results/faculty', '50 gallery images', 'YouTube videos (20)', 'Follow-up reminders', 'CSV export enquiries', 'Custom domain support', 'Conversion stats', 'Priority support'],
      color: 'bg-gray-100'
    }
  ];

  if (loading) return <div>Loading...</div>;

  const daysUntilExpiry = subscription.plan_expiry 
    ? Math.ceil((subscription.plan_expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{subscription.plan?.charAt(0).toUpperCase() + subscription.plan?.slice(1)} Plan</h2>
              <p className="text-sm text-gray-500 capitalize">Status: {subscription.status}</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-bold ${
            subscription.status === 'active' ? 'bg-green-100 text-green-700' : 
            subscription.status === 'trial' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {subscription.status === 'active' && <CheckCircle className="w-4 h-4 inline mr-1" />}
            {subscription.status === 'trial' && <Calendar className="w-4 h-4 inline mr-1" />}
            {subscription.status === 'expired' && <AlertTriangle className="w-4 h-4 inline mr-1" />}
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </div>
        </div>

        {daysUntilExpiry !== null && (
          <div className={`p-4 rounded-xl ${daysUntilExpiry > 30 ? 'bg-green-50' : daysUntilExpiry > 7 ? 'bg-yellow-50' : 'bg-red-50'}`}>
            <div className="flex items-center gap-2">
              <Calendar className={`w-5 h-5 ${daysUntilExpiry > 30 ? 'text-green-600' : daysUntilExpiry > 7 ? 'text-yellow-600' : 'text-red-600'}`} />
              <span className={`font-bold ${daysUntilExpiry > 30 ? 'text-green-700' : daysUntilExpiry > 7 ? 'text-yellow-700' : 'text-red-700'}`}>
                {daysUntilExpiry > 0 ? `${daysUntilExpiry} days until renewal` : 'Plan expired — renew now to avoid service interruption'}
              </span>
            </div>
            {subscription.plan_expiry && (
              <p className="text-sm text-gray-500 mt-1">
                Renewal due: {subscription.plan_expiry.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}
          </div>
        )}

        {subscription.razorpay_subscription_id && (
          <p className="text-xs text-gray-400 mt-2">
            Subscription ID: {subscription.razorpay_subscription_id}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
            Renew Subscription
          </button>
          <button className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Available Plans */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`p-6 rounded-2xl shadow-sm border ${plan.current ? 'border-blue-200 ring-2 ring-blue-100' : 'border-gray-100'}`}>
              <div className={`${plan.color} -mx-6 -mt-6 p-6 rounded-t-2xl mb-4`}>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-2xl font-black mt-2">{plan.price}</p>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.current && (
                <div className="mt-4 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-center text-sm font-bold">
                  Current Plan
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment History Placeholder */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Payment History</h3>
        <div className="text-center text-gray-400 py-8">
          <p>No payment history available yet.</p>
          <p className="text-sm mt-1">Your payment records will appear here after your first transaction.</p>
        </div>
      </div>
    </div>
  );
}
