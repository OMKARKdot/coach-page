import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

const planAmounts: Record<string, number> = {
  starter: 399900,
  professional: 699900,
  institute: 999900,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tenantId, plan, product } = body;

    const amount = planAmounts[plan] || 699900;

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      notes: {
        tenantId,
        product: product || 'coachpage',
        plan,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
