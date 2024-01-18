export const runtime = 'edge'; // 'nodejs' is the default
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { StripeEvent } from "./types";
import { Resend } from 'resend';

export async function POST(request: Request) {
  const body = await request.json() as StripeEvent;
  const resend = new Resend(process.env.RESEND_KEY || "");
  if (body.data.object.metadata.password !== "30nn") {
    return new Response("OK");
  }

  await resend.emails.send({
    from: 'Scholar Snooze <purchases@scholarsnooze.com>',
    to: ['me@r0h.in'],
    subject: 'NEW MONEY BABY!',
    text: `New order. ${JSON.stringify(body.data.object.metadata)}`,
  });

  return new Response("OK");
}