'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, slideInLeft, slideInRight, stagger } from '@/lib/animations'

const credentials = [
  { icon: '🥊', label: 'Golden Gloves Competitor' },
  { icon: '✓', label: 'Certified Boxing Coach' },
  { icon: '⚡', label: '8+ Years Experience' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: 'var(--section-pad) var(--gutter)',
        background: '#080808',
      }}
    >
      <div
        style={{ maxWidth: '1200px', margin: '0 auto' }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
      >
        {/* Image side */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ position: 'relative', maxWidth: '480px', margin: '0 auto', width: '100%' }}
        >
          {/* Floating image container */}
          <div
            className="animate-float"
            style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}
          >
            {/* Placeholder image — replace with trainer photo */}
            <div
              style={{
                aspectRatio: '3/4',
                background: 'linear-gradient(160deg, #1a1a1a 0%, #111111 50%, #0d0508 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '16px',
                border: '1px solid #222222',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Placeholder boxing silhouette */}
              <svg viewBox="0 0 200 280" fill="none" style={{ width: '55%', opacity: 0.15 }}>
                <path d="M100 20 C100 20 80 40 80 70 C80 85 85 95 90 100 L70 160 C65 175 60 190 65 200 C70 210 80 215 90 210 L100 200 L110 210 C120 215 130 210 135 200 C140 190 135 175 130 160 L110 100 C115 95 120 85 120 70 C120 40 100 20 100 20Z" fill="#f5f5f7"/>
                <circle cx="100" cy="40" r="18" fill="#f5f5f7"/>
                <path d="M70 110 L40 130 C35 133 30 140 32 148 C34 156 42 160 50 157 L80 145" stroke="#f5f5f7" strokeWidth="8" strokeLinecap="round"/>
                <path d="M130 110 L160 130 C165 133 170 140 168 148 C166 156 158 160 150 157 L120 145" stroke="#f5f5f7" strokeWidth="8" strokeLinecap="round"/>
                <ellipse cx="42" cy="150" rx="14" ry="10" fill="#c8102e" opacity="0.8"/>
                <ellipse cx="158" cy="150" rx="14" ry="10" fill="#c8102e" opacity="0.8"/>
              </svg>

              {/* Red accent border glow on right edge */}
              <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '3px',
                background: 'linear-gradient(to bottom, transparent, #c8102e, transparent)',
              }} />

              {/* Label overlay */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
              }}>
                <div style={{
                  background: 'rgba(8,8,8,0.8)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid #222',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                }}>
                  <p style={{ color: '#424245', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Trainer Photo
                  </p>
                  <p style={{ color: '#86868b', fontSize: '0.75rem' }}>
                    High-res photo to be provided by client
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative element */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: '-24px',
              left: '-24px',
              width: '120px',
              height: '120px',
              borderRadius: '12px',
              background: 'rgba(200,16,46,0.08)',
              border: '1px solid rgba(200,16,46,0.2)',
              zIndex: -1,
            }}
          />
        </motion.div>

        {/* Text side */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <motion.span
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#c8102e',
            }}
          >
            Meet Your Coach
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
            [Trainer Name]
          </motion.h2>

          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', lineHeight: 1.8, color: '#86868b' }}>
              [Trainer bio paragraph 1 — background and how they got into boxing. Replace with real content from client before launch.]
            </p>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', lineHeight: 1.8, color: '#86868b' }}>
              Every session is built around <em style={{ color: '#f5f5f7', fontStyle: 'normal' }}>you</em>, not a script. Whether you&apos;re throwing your first jab or stepping into the ring for a fight — I meet you where you are and get you where you want to be.
            </p>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', lineHeight: 1.8, color: '#86868b' }}>
              [Credentials, experience, notable achievements — provided by client.]
            </p>
          </motion.div>

          {/* Credential badges */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {credentials.map((cred) => (
              <span
                key={cred.label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: '#111111',
                  border: '1px solid #222222',
                  borderRadius: '9999px',
                  padding: '0.4rem 0.875rem',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: '#f5f5f7',
                }}
              >
                <span>{cred.icon}</span>
                {cred.label}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link href="/book" className="btn-primary">
              Book a Session →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
