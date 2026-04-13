'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, stagger } from '@/lib/animations'

export default function BookingCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        padding: 'var(--section-pad) var(--gutter)',
        overflow: 'hidden',
        background: '#080808',
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,16,46,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Noise texture overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px',
        }}
      />

      {/* Top border */}
      <div style={{ position: 'absolute', top: 0, left: 'var(--gutter)', right: 'var(--gutter)', height: '1px', background: '#222222' }} />

      <div
        ref={undefined}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
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
            Limited Spots Available
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
            READY TO START?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: 1.7,
              color: '#86868b',
              maxWidth: '460px',
            }}
          >
            Sessions are limited. Book your spot before it fills up. First session is an assessment — no experience needed.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link href="/book" className="btn-primary" style={{ fontSize: '0.9rem', padding: '1.1rem 3rem' }}>
              Book a Session →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
