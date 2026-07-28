import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { CONTACT_EMAIL } from '@/lib/site'

/* Contact form delivery via Resend.
   Env (see .env.example):
   - RESEND_API_KEY — required in production; without it the route runs in
     "simulated" mode so the form flow stays testable in dev.
   - CONTACT_FROM — verified sender. Until the client's domain is verified in
     Resend, the onboarding sender below is the only address Resend accepts.
   - CONTACT_TO — where submissions land. */

const FROM = process.env.CONTACT_FROM ?? 'Bad Brain Site <onboarding@resend.dev>'
const TO = process.env.CONTACT_TO ?? CONTACT_EMAIL

const MAX = { name: 200, email: 254, service: 50, message: 5000 } as const

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const field = (key: keyof typeof MAX) =>
    typeof body[key] === 'string' ? (body[key] as string).trim().slice(0, MAX[key]) : ''

  const name = field('name')
  const email = field('email')
  const service = field('service')
  const message = field('message')

  // Honeypot — the visible form never fills this; bots do. Report success so
  // they don't learn anything.
  if (typeof body.company === 'string' && body.company !== '') {
    return NextResponse.json({ ok: true })
  }

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_fields' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Dev without credentials: pretend-send so the UI flow is exercisable.
    console.warn('[contact] RESEND_API_KEY not set — simulating send', { name, email, service })
    return NextResponse.json({ ok: true, simulated: true })
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `Site enquiry from ${name}${service ? ` — ${service}` : ''}`,
      text: [`Name: ${name}`, `Email: ${email}`, `Interested in: ${service || '—'}`, '', message].join('\n'),
    })
    if (error) {
      console.error('[contact] resend error', error)
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] send threw', err)
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }
}
