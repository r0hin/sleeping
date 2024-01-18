export const runtime = 'nodejs'; // 'nodejs' is the default
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import stripe from "stripe";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature") || "";
  const client = new stripe(process.env.STRIPE_KEY || "");
  const body = await request.json();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_KEY || "");
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message || ""}`, { status: 400 });
  }

  console.log(event)

  return new Response(JSON.stringify({ received: true }));
}