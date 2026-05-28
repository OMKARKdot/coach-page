import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import crypto from 'crypto';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || 'coachpage_tenants';

function verifySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(body.toString())
    .digest('hex');
  return expectedSignature === signature;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      tenantId,
      plan,
      product,
    } = body;

    if (!verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const collection = product === 'coachpage' ? COLLECTION : 'clinicpage_tenants';
    const now = new Date();
    const expiry = new Date(now);
    expiry.setFullYear(expiry.getFullYear() + 1);

    await updateDoc(doc(db, collection, tenantId), {
      plan,
      plan_start: serverTimestamp(),
      plan_expiry: serverTimestamp(),
      razorpay_payment_id,
      razorpay_order_id,
      status: 'active',
      last_payment_date: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id,
      message: 'Payment verified and subscription activated',
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
