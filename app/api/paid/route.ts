export const runtime = 'edge'; // 'nodejs' is the default
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import stripe from "stripe";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature") || "";
  // const client = new stripe(process.env.STRIPE_KEY || "");
  const body = await request.json();

  console.log(body)

  return new Response(JSON.stringify({ received: true }));
}