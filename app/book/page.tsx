'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/* ─── Types ─────────────────────────────────────────────── */
type SessionType = {
  id: string
  title: string
  duration: string
  description: string
  badge?: string
}

type BookingState = {
  sessionType: string
  date: string
  time: string
  firstName: string
  lastName: string
  email: string
  phone: string
  notes: string
}

/* ─── Data ────────────────────────────────────────────────── */
const sessionTypes: SessionType[] = [
  {
    id: 'intro',
    title: 'First-Time Intro Session',
    duration: '60 min',
    description: 'New to boxing or to Limitless Box? This session is a full assessment of your current level and goals. The foundation for everything.',
    badge: 'Start here',
  },
  {
    id: 'private',
    title: '1-on-1 Private Session',
    duration: '60 min',
    description: 'Fully personalized. Built around what you need to work on that day. Technique, conditioning, sparring — your call.',
  },
  {
    id: 'comp',
    title: 'Competitive Prep Session',
    duration: '60 min',
    description: 'Fight camp-style. For those training toward an amateur bout, white-collar fight, or serious sparring. High intensity.',
  },
]

// Mock available time slots
const mockSlots: Record<string, string[]> = {
  Mon: ['7:00 AM', '9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'],
  Tue: ['8:00 AM', '10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
  Wed: ['7:00 AM', '9:00 AM', '12:00 PM', '4:00 PM', '7:00 PM'],
  Thu: ['8:00 AM', '11:00 AM', '2:00 PM', '5:00 PM', '6:00 PM'],
  Fri: ['7:00 AM', '9:00 AM', '10:00 AM', '3:00 PM'],
  Sat: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
  Sun: [],
}

/* ─── Helpers ─────────────────────────────────────────────── */
function getNext30Days() {
  const days: { date: Date; dateStr: string; dayName: string; dayNum: number; month: string }[] = []
  const now = new Date()
  for (let i = 1; i <= 30; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    const dayName = d.toLocaleDateString('en-CA', { weekday: 'short' }) as keyof typeof mockSlots
    days.push({
      date: d,
      dateStr: d.toISOString().split('T')[0],
      dayName,
      dayNum: d.getDate(),
      month: d.toLocaleDateString('en-CA', { month: 'short' }),
    })
  }
  return days
}

/* ─── Step Progress ───────────────────────────────────────── */
const STEPS = ['Session', 'Date', 'Time', 'Details', 'Confirm']

function StepIndicator({ current }: { current: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
      {STEPS.map((label, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 600,
              fontFamily: 'var(--font-dm-sans)',
              background: i < current ? '#c8102e' : i === current ? 'transparent' : 'transparent',
              border: i < current ? 'none' : i === current ? '2px solid #c8102e' : '1px solid #222',
              color: i < current ? 'white' : i === current ? '#c8102e' : '#424245',
              transition: 'all 0.3s',
            }}>
              {i < current ? '✓' : i + 1}
            </div>
            <span style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: i === current ? '#f5f5f7' : '#424245',
              fontWeight: i === current ? 600 : 400,
            }}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{
              width: 'clamp(1rem, 4vw, 3rem)',
              height: '1px',
              background: i < current ? '#c8102e' : '#222',
              transition: 'background 0.3s',
              marginBottom: '1.5rem',
            }} />
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Field component ─────────────────────────────────────── */
function Field({
  label, id, type = 'text', value, onChange, placeholder, required, error,
}: {
  label: string; id: string; type?: string; value: string
  onChange: (v: string) => void; placeholder?: string; required?: boolean; error?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label
        htmlFor={id}
        style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#86868b' }}
      >
        {label}{required && <span style={{ color: '#c8102e' }}> *</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{
            background: '#111111',
            border: `1px solid ${error ? '#c8102e' : '#222222'}`,
            borderRadius: '8px',
            padding: '0.875rem 1rem',
            color: '#f5f5f7',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '1rem',
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#c8102e' }}
          onBlur={(e) => { e.target.style.borderColor = error ? '#c8102e' : '#222222' }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            background: '#111111',
            border: `1px solid ${error ? '#c8102e' : '#222222'}`,
            borderRadius: '8px',
            padding: '0.875rem 1rem',
            color: '#f5f5f7',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#c8102e' }}
          onBlur={(e) => { e.target.style.borderColor = error ? '#c8102e' : '#222222' }}
        />
      )}
      {error && (
        <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: '#c8102e' }}>{error}</span>
      )}
    </div>
  )
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function BookPage() {
  const [step, setStep] = useState(0)
  const [success, setSuccess] = useState(false)

  const [booking, setBooking] = useState<BookingState>({
    sessionType: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Partial<BookingState>>({})

  const days = getNext30Days()

  const selectedDayName = booking.date
    ? new Date(booking.date + 'T00:00:00').toLocaleDateString('en-CA', { weekday: 'short' })
    : null
  const availableSlots = selectedDayName ? (mockSlots[selectedDayName as keyof typeof mockSlots] ?? []) : []

  const selectedSession = sessionTypes.find((s) => s.id === booking.sessionType)
  const selectedDayFormatted = booking.date
    ? new Date(booking.date + 'T00:00:00').toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  function validateDetails() {
    const e: Partial<BookingState> = {}
    if (!booking.firstName.trim()) e.firstName = 'First name is required'
    if (!booking.lastName.trim()) e.lastName = 'Last name is required'
    if (!booking.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) e.email = 'Valid email is required'
    if (!booking.phone.trim()) e.phone = 'Phone number is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function goNext() {
    if (step === 3 && !validateDetails()) return
    setStep((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleConfirm() {
    setSuccess(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const slideVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  }

  if (success) {
    return (
      <main style={{ minHeight: '100svh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem clamp(1.5rem, 5vw, 3rem)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '500px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
        >
          {/* Check */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(200,16,46,0.12)',
            border: '1px solid rgba(200,16,46,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: '#c8102e',
          }}>
            ✓
          </div>
          <h1 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#f5f5f7', letterSpacing: '0.02em', lineHeight: 1 }}>
            YOU&apos;RE BOOKED.
          </h1>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', color: '#86868b', lineHeight: 1.7 }}>
            A confirmation email is on its way to <strong style={{ color: '#f5f5f7' }}>{booking.email}</strong>. See you at your session.
          </p>
          <div style={{ background: '#111111', border: '1px solid #222', borderRadius: '12px', padding: '1.5rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
            {[
              { label: 'Session', value: selectedSession?.title ?? '' },
              { label: 'Date', value: selectedDayFormatted },
              { label: 'Time', value: booking.time },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#424245' }}>{label}</span>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', color: '#f5f5f7', textAlign: 'right' }}>{value}</span>
              </div>
            ))}
          </div>
          <Link href="/" className="btn-secondary" style={{ fontSize: '0.8rem' }}>← Back to Home</Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100svh', background: '#080808', paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 3rem)' }}>

        {/* Page header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c8102e', display: 'block', marginBottom: '0.75rem' }}>
            Book a Session
          </span>
          <h1 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#f5f5f7', letterSpacing: '0.02em', lineHeight: 1 }}>
            LET&apos;S GET STARTED.
          </h1>
        </div>

        <StepIndicator current={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          >

            {/* ── Step 0: Session Type ── */}
            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '1.75rem', color: '#f5f5f7', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                  Choose Your Session
                </h2>
                {sessionTypes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setBooking((b) => ({ ...b, sessionType: s.id }))}
                    style={{
                      background: booking.sessionType === s.id ? 'rgba(200,16,46,0.08)' : '#111111',
                      border: `1px solid ${booking.sessionType === s.id ? '#c8102e' : '#222222'}`,
                      borderRadius: '12px',
                      padding: '1.25rem 1.5rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                    }}
                  >
                    {/* Radio indicator */}
                    <div style={{
                      flexShrink: 0,
                      marginTop: '0.2rem',
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `2px solid ${booking.sessionType === s.id ? '#c8102e' : '#424245'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {booking.sessionType === s.id && (
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#c8102e' }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                        <span style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 600, fontSize: '1rem', color: '#f5f5f7' }}>
                          {s.title}
                        </span>
                        {s.badge && (
                          <span style={{ background: 'rgba(200,16,46,0.15)', border: '1px solid rgba(200,16,46,0.3)', borderRadius: '9999px', padding: '0.15rem 0.5rem', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c8102e' }}>
                            {s.badge}
                          </span>
                        )}
                        <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: '#424245' }}>— {s.duration}</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: '#86868b', lineHeight: 1.6 }}>
                        {s.description}
                      </p>
                    </div>
                  </button>
                ))}
                <div style={{ marginTop: '1rem' }}>
                  <button
                    onClick={goNext}
                    disabled={!booking.sessionType}
                    className="btn-primary"
                    style={{ opacity: booking.sessionType ? 1 : 0.4, cursor: booking.sessionType ? 'pointer' : 'not-allowed' }}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 1: Date ── */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '1.75rem', color: '#f5f5f7', letterSpacing: '0.04em' }}>
                  Pick a Date
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
                  gap: '0.5rem',
                }}>
                  {days.map((d) => {
                    const slots = mockSlots[d.dayName as keyof typeof mockSlots] ?? []
                    const unavailable = slots.length === 0
                    const isSelected = booking.date === d.dateStr
                    return (
                      <button
                        key={d.dateStr}
                        onClick={() => !unavailable && setBooking((b) => ({ ...b, date: d.dateStr, time: '' }))}
                        disabled={unavailable}
                        style={{
                          background: isSelected ? '#c8102e' : unavailable ? '#0d0d0d' : '#111111',
                          border: `1px solid ${isSelected ? '#c8102e' : unavailable ? '#1a1a1a' : '#222222'}`,
                          borderRadius: '10px',
                          padding: '0.75rem 0.25rem',
                          cursor: unavailable ? 'not-allowed' : 'pointer',
                          opacity: unavailable ? 0.4 : 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.25rem',
                          transition: 'all 0.15s',
                          minHeight: 44,
                        }}
                        className={!unavailable && !isSelected ? 'hover:border-[#444]' : ''}
                        aria-label={`${d.date.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric' })}${unavailable ? ' — unavailable' : ''}`}
                      >
                        <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: isSelected ? 'white' : '#424245' }}>
                          {d.dayName}
                        </span>
                        <span style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '1.5rem', lineHeight: 1, color: isSelected ? 'white' : unavailable ? '#424245' : '#f5f5f7' }}>
                          {d.dayNum}
                        </span>
                        <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.6rem', color: isSelected ? 'rgba(255,255,255,0.7)' : '#424245' }}>
                          {d.month}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {booking.date && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: '#86868b' }}
                  >
                    {availableSlots.length} slots available on {selectedDayFormatted}
                  </motion.p>
                )}

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={goBack} style={{ background: 'none', border: 'none', color: '#86868b', cursor: 'pointer', fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', padding: '0.5rem 0' }}>
                    ← Back
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!booking.date}
                    className="btn-primary"
                    style={{ opacity: booking.date ? 1 : 0.4, cursor: booking.date ? 'pointer' : 'not-allowed' }}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2: Time ── */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '1.75rem', color: '#f5f5f7', letterSpacing: '0.04em' }}>
                    Choose a Time
                  </h2>
                  <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: '#86868b', marginTop: '0.4rem' }}>
                    {selectedDayFormatted}
                  </p>
                </div>

                {availableSlots.length === 0 ? (
                  <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', color: '#86868b' }}>
                    No slots available on this date. Please go back and pick another day.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setBooking((b) => ({ ...b, time: slot }))}
                        style={{
                          background: booking.time === slot ? '#c8102e' : '#111111',
                          border: `1px solid ${booking.time === slot ? '#c8102e' : '#222222'}`,
                          borderRadius: '9999px',
                          padding: '0.625rem 1.25rem',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          color: booking.time === slot ? 'white' : '#f5f5f7',
                          transition: 'all 0.15s',
                          minHeight: 44,
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={goBack} style={{ background: 'none', border: 'none', color: '#86868b', cursor: 'pointer', fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', padding: '0.5rem 0' }}>
                    ← Back
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!booking.time}
                    className="btn-primary"
                    style={{ opacity: booking.time ? 1 : 0.4, cursor: booking.time ? 'pointer' : 'not-allowed' }}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3: Details ── */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '1.75rem', color: '#f5f5f7', letterSpacing: '0.04em' }}>
                  Your Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="First Name" id="firstName" required
                    value={booking.firstName} onChange={(v) => setBooking((b) => ({ ...b, firstName: v }))}
                    placeholder="Jane" error={errors.firstName}
                  />
                  <Field
                    label="Last Name" id="lastName" required
                    value={booking.lastName} onChange={(v) => setBooking((b) => ({ ...b, lastName: v }))}
                    placeholder="Smith" error={errors.lastName}
                  />
                </div>
                <Field
                  label="Email" id="email" type="email" required
                  value={booking.email} onChange={(v) => setBooking((b) => ({ ...b, email: v }))}
                  placeholder="jane@example.com" error={errors.email}
                />
                <Field
                  label="Phone" id="phone" type="tel" required
                  value={booking.phone} onChange={(v) => setBooking((b) => ({ ...b, phone: v }))}
                  placeholder="+1 (647) 000-0000" error={errors.phone}
                />
                <Field
                  label="Anything I should know? (optional)" id="notes" type="textarea"
                  value={booking.notes} onChange={(v) => setBooking((b) => ({ ...b, notes: v }))}
                  placeholder="Injuries, goals, experience level, anything at all..."
                />

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={goBack} style={{ background: 'none', border: 'none', color: '#86868b', cursor: 'pointer', fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', padding: '0.5rem 0' }}>
                    ← Back
                  </button>
                  <button onClick={goNext} className="btn-primary">Review Booking →</button>
                </div>
              </div>
            )}

            {/* ── Step 4: Confirm ── */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '1.75rem', color: '#f5f5f7', letterSpacing: '0.04em' }}>
                  Review Your Booking
                </h2>

                <div style={{ background: '#111111', border: '1px solid #222', borderRadius: '16px', overflow: 'hidden' }}>
                  {[
                    { label: 'Session', value: selectedSession?.title ?? '' },
                    { label: 'Date', value: selectedDayFormatted },
                    { label: 'Time', value: booking.time },
                    { label: 'Name', value: `${booking.firstName} ${booking.lastName}` },
                    { label: 'Email', value: booking.email },
                    { label: 'Phone', value: booking.phone },
                    ...(booking.notes ? [{ label: 'Notes', value: booking.notes }] : []),
                  ].map(({ label, value }, i, arr) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '1rem',
                        padding: '1rem 1.5rem',
                        borderBottom: i < arr.length - 1 ? '1px solid #1a1a1a' : 'none',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#424245', flexShrink: 0 }}>
                        {label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', color: '#f5f5f7', textAlign: 'right' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: '#424245', lineHeight: 1.6 }}>
                  By confirming, you agree to the cancellation policy: cancellations must be made at least 24 hours in advance.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={goBack} style={{ background: 'none', border: 'none', color: '#86868b', cursor: 'pointer', fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', padding: '0.5rem 0' }}>
                    ← Back
                  </button>
                  <button onClick={handleConfirm} className="btn-primary">
                    Confirm Booking ✓
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
