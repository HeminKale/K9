import { NextResponse } from "next/server";
import { Resend } from "resend";

import { business } from "@/lib/constants";
import { contactFormSchema } from "@/lib/contactSchema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please fix the highlighted fields and try again.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not configured.");
    return NextResponse.json(
      {
        success: false,
        message:
          "Email delivery isn't configured yet. Please call or email us directly instead.",
      },
      { status: 503 }
    );
  }

  const { name, phone, email, dogBreed, dogAge, problem, preferredTime } = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL || business.email;
  const from = process.env.RESEND_FROM_EMAIL || "Website Contact Form <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New training inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Dog breed: ${dogBreed}`,
        `Dog age: ${dogAge}`,
        `Preferred time: ${preferredTime}`,
        "",
        "Problem description:",
        problem,
      ].join("\n"),
    });

    if (error) {
      console.error("Contact form: Resend returned an error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "We couldn't send your message. Please try again or contact us directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Thanks! We'll be in touch soon." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact form: failed to send email:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
