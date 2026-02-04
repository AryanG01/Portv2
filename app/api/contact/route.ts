import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod/v4";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message too long"),
  turnstileToken: z.string().min(1, "Verification required"),
});

// Simple in-memory rate limiter
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count += 1;
  return false;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Skip verification in dev if not configured

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    }
  );

  const data = await res.json();
  return data.success === true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const { name, email, message, turnstileToken } = parsed.data;

    // Verify Turnstile
    const turnstileValid = await verifyTurnstile(turnstileToken, ip);
    if (!turnstileValid) {
      return NextResponse.json(
        { error: "Verification failed. Please try again." },
        { status: 400 }
      );
    }

    // Send email
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "aryan.ganju@u.nus.edu",
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
