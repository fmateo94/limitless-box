'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, stagger } from '@/lib/animations'

const services = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}>
        <path d="M8 18C8 18 10 12 16 10C22 8 26 12 26 18C26 24 22 28 16 28C10 28 8 24 8 18Z" stroke="#c8102e" strokeWidth="1.5"/>
        <path d="M26 14L32 10C33.5 9 35 10 34.5 12L32 20C31.5 22 29.5 23 28 22.5L26 22" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="18" r="3" fill="#c8102e" opacity="0.4"/>
      </svg>
    ),
    title: '1-ON-1 PRIVATE SESSIONS',
    description: 'Fully personalized sessions at our Mississauga location. Each session is built around your current level, your goals, and what you need to work on that day. No cookie-cutter workouts.',
    highlight: 'Most popular',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}>
        <circle cx="20" cy="20" r="12" stroke="#c8102e" strokeWidth="1.5"/>
        <circle cx="20" cy="20" r="6" stroke="#c8102e" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="20" cy="20" r="2" fill="#c8102e"/>
        <path d="M20 8V4M20 36V32M8 20H4M36 20H32" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    title: 'BEGINNER PROGRAMS',
    description: 'Never thrown a punch? Perfect. The beginner program covers stance, footwork, combinations, and defensive fundamentals — at your pace, with zero judgment. Everyone starts somewhere.',
    highlight: null,
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}>
        <path d="M20 4L23.5 14H34L25.5 20.5L29 30.5L20 24L11 30.5L14.5 20.5L6 14H16.5L20 4Z" stroke="#c8102e" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M20 4L23.5 14H34L25.5 20.5L29 30.5L20 24L11 30.5L14.5 20.5L6 14H16.5L20 4Z" fill="#c8102e" opacity="0.1"/>
      </svg>
    ),
    title: 'COMPETITIVE PREP',
    description: 'Training for an amateur fight, white-collar bout, or want to spar seriously? Fight camp-style preparation including conditioning, sparring strategy, and mental game.',
    highlight: null,
  },
]

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="services"
      ref={ref}
      style={{
        padding: 'var(--section-pad) var(--gutter)',
        background: '#080808',
        position: 'relative',
      }}
    >
      {/* Subtle top border */}
      <div style={{ position: 'absolute', top: 0, left: 'var(--gutter)', right: 'var(--gutter)', height: '1px', background: '#222222' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <motion.span
            variants={fadeUp}
            style={{
              display: 'block',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#c8102e',
              marginBottom: '1rem',
            }}
          >
            What You Get
          </motion.span>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-bebas-neue)',
              fontSize: 'var(--text-display)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              color: '#f5f5f7',
            }}
          >
            BUILT FOR<br />YOUR GOALS.
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: '#222222', borderRadius: '16px', overflow: 'hidden' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              whileHover={{ scale: 1.01 }}
              style={{
                background: '#111111',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                position: 'relative',
                cursor: 'default',
                transition: 'background 0.2s',
              }}
              className="group hover:bg-[#141114]"
            >
              {service.highlight && (
                <span style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: 'rgba(200,16,46,0.15)',
                  border: '1px solid rgba(200,16,46,0.3)',
                  borderRadius: '9999px',
                  padding: '0.2rem 0.6rem',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#c8102e',
                }}>
                  {service.highlight}
                </span>
              )}

              <div>{service.icon}</div>

              <h3
                style={{
                  fontFamily: 'var(--font-bebas-neue)',
                  fontSize: '1.5rem',
                  letterSpacing: '0.04em',
                  color: '#f5f5f7',
                  lineHeight: 1.1,
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: '#86868b',
                  flex: 1,
                }}
              >
                {service.description}
              </p>

              {/* Bottom accent line on hover */}
              <div
                className="opacity-0 group-hover:opacity-100"
                style={{
                  height: '2px',
                  background: 'linear-gradient(to right, #c8102e, transparent)',
                  transition: 'opacity 0.3s',
                  borderRadius: '1px',
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <Link href="/book" className="btn-primary">
            Book Your First Session →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
