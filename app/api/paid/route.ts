export const runtime = 'edge'; // 'nodejs' is the default
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { StripeEvent } from "./types";
import { google } from "googleapis"

export async function POST(request: Request) {
  const body = await request.json() as StripeEvent;
  if (body.data.object.metadata.password !== "30nn") {
    return new Response("OK");
  }

  // Add body.data.object.metadata.etc to db. resend to send mail.
  // https://docs.google.com/spreadsheets/d/1srzA9Yna1T3246PNG55sRk0J20PAywAGCIRKV_6aQQk/edit?usp=sharing

  const auth = await google.auth.getClient({ scopes: ["https://www.googleapis.com/auth/spreadsheets"], keyFile: "service.json" });
  const sheets = google.sheets({ version: "v4", auth});
  const id = "1srzA9Yna1T3246PNG55sRk0J20PAywAGCIRKV_6aQQk";

  // Append row to spreadsheet
  await sheets.spreadsheets.values.append({
    spreadsheetId: id,
    range: "A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          body.data.object.customer_email,
          body.data.object.metadata.size,
          body.data.object.metadata.frame,
          body.data.object.metadata.term,
          body.data.object.metadata.payment,
          body.data.object.metadata.delivery,
          body.data.object.metadata.totalMo,
          body.data.object.metadata.totalToday,
          body.data.object.metadata.totalForever,
          body.data.object.metadata.password,
        ]
      ]
    }
  });

  return new Response("OK");
}