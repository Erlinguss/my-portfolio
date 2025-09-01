import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Body = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Body;

    // basic validation (keep it simple)
    const name = (data.name ?? "").trim();
    const email = (data.email ?? "").trim();
    const message = (data.message ?? "").trim();
    const company = (data.company ?? "").trim(); // honeypot

    if (company) {
      // bot: pretend success
      return NextResponse.json({ ok: true }, { status: 204 });
    }
    if (name.length < 2 || !email.includes("@") || message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    // env checks (useful to avoid 500 mystery)
    const FROM = process.env.CONTACT_FROM;
    const TO = process.env.CONTACT_TO;
    const KEY = process.env.RESEND_API_KEY;
    if (!FROM || !TO || !KEY) {
      return NextResponse.json(
        { ok: false, error: "Missing email configuration" },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <h2>New Contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Contact error:", err.message);
    } else {
      console.error("Contact error:", err);
    }
    return NextResponse.json(
      { ok: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
