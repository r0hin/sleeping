export const runtime = 'edge'; // 'nodejs' is the default
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { Resend } from 'resend';

export async function POST(request: Request) {
  const body = await request.json() as StripeEvent;
  const resend = new Resend(process.env.RESEND_KEY || "");
  if (body.data.object.metadata.password !== "30nn") {
    return new Response("NOT OK");
  }

  let details = ``;
  for (const [key, value] of Object.entries(body.data.object.metadata)) {
    details += `<b>${key}</b>: ${value}<br>`;
  }

  await resend.emails.send({
    from: 'Scholar Snooze <purchases@scholarsnooze.com>',
    to: ['me@r0h.in', 'jacksdorr@gmail.com'],
    // to: ['me@r0h.in'],
    subject: 'NEW MONEY BABY!',
    html: `<h1>🗿 New Order </h1><br>${details}`
  });

  return new Response("OK");
}

interface StripeEvent {
  id: string,
  object: string,
  api_version: string,
  created: number,
  data: {
    object: {
      id: string,
      object: string,
      after_expiration: null,
      allow_promotion_codes: null,
      amount_subtotal: number,
      amount_total: number,
      automatic_tax: { enabled: boolean, status: null },
      billing_address_collection: null,
      cancel_url: string,
      client_reference_id: null,
      client_secret: null,
      consent: null,
      consent_collection: null,
      created: number,
      currency: string,
      currency_conversion: null,
      custom_fields: [],
      custom_text: {
        after_submit: null,
        shipping_address: null,
        submit: null,
        terms_of_service_acceptance: null
      },
      customer: null,
      customer_creation: string,
      customer_details: {
        address: {
          city: string,
          country: string,
          line1: string,
          line2: null,
          postal_code: string,
          state: string
        },
        email: string,
        name: string,
        phone: null,
        tax_exempt: string,
        tax_ids: []
      },
      customer_email: string,
      expires_at: number,
      invoice: null,
      invoice_creation: {
        enabled: boolean,
        invoice_data: {
          account_tax_ids: null,
          custom_fields: null,
          description: null,
          footer: null,
          metadata: {},
          rendering_options: null
        }
      },
      livemode: boolean,
      locale: null,
      metadata: {
        size: string,
        frame: string,
        term: string,
        payment: string,
        delivery: string,
        referrer: string,
        totalMo: number,
        totalToday: number,
        totalForever: number,
        password: string
      },
      mode: string,
      payment_intent: string,
      payment_link: null,
      payment_method_collection: string,
      payment_method_types: [],
      payment_status: string,
      phone_number_collection: { enabled: boolean },
      shipping: null,
      shipping_address_collection: null,
      shipping_rates: [],
      status: string,
      submit_type: null,
      subscription: null,
      success_url: string,
      total_details: {
        amount_discount: number,
        amount_tax: number,
        breakdown: { discount: { discounts: [], total: number }, tax: { tax_rates: [], total: number } }
      },
      ui: string,
      url: string
    }
  }
  livemode: boolean,
  pending_webhooks: number,
  request: {
    id: string,
    idempotency_key: null
  },
  type: string
}