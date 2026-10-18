import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const from = String(body.from || "").trim();
    // Kept to a single line since it also goes in the email subject
    const org = String(body.org || "").replace(/\s+/g, " ").trim().slice(0, 200);
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!from || !org || !emailValid || !subject) {
      return NextResponse.json(
        { ok: false, error: "Invalid form data" },
        { status: 400 }
      );
    }

    // Compose a simple text email
    const text = `New contact submission\n\nFrom: ${from}\nOrganisation: ${org}\nEmail: ${email}\n\nSubject / Message:\n${subject}`;

    const { error } = await resend.emails.send({
      from: "Katha <no-reply@katha.io>",
      to: "hello@katha.io",
      subject: `Contact Form: ${from} (${org})`,
      text,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message || "Email send failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err instanceof Error && err.message) || "Unexpected error" },
      { status: 500 }
    );
  }
}
