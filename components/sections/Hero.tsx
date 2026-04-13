'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, fadeIn, stagger } from '@/lib/animations'

export default function Hero() {
  const { scrollY } = useScroll()
  const chevronOpacity = useTransform(scrollY, [0, 200], [1, 0])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #080808 40%, #100508 100%)',
          zIndex: 0,
        }}
      />

      {/* Subtle geometric accent — boxing ring ropes inspiration */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Large red circle glow — upper right */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-15%',
          width: 'clamp(400px, 60vw, 900px)',
          height: 'clamp(400px, 60vw, 900px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,16,46,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Faint diagonal lines */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03 }}
          preserveAspectRatio="none"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i}
              x1={`${i * 5 - 10}%`} y1="0%"
              x2={`${i * 5 + 40}%`} y2="100%"
              stroke="#f5f5f7"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      {/* Gradient overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.2) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.95) 100%)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 3rem)',
          paddingBottom: 'clamp(4rem, 8vw, 6rem)',
          width: '100%',
        }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeIn}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#c8102e',
              }}
            >
              <span style={{ display: 'inline-block', width: 20, height: 1, background: '#c8102e' }} />
              Personal Boxing Coach · Mississauga, ON
            </span>
          </motion.div>

          {/* Heading */}
          <div>
            <motion.div variants={fadeUp}>
              <h1
                style={{
                  fontFamily: 'var(--font-bebas-neue)',
                  fontSize: 'var(--text-hero)',
                  lineHeight: 0.9,
                  letterSpacing: '0.02em',
                  color: '#f5f5f7',
                }}
              >
                TRAIN LIKE
              </h1>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h1
                style={{
                  fontFamily: 'var(--font-bebas-neue)',
                  fontSize: 'var(--text-hero)',
                  lineHeight: 0.9,
                  letterSpacing: '0.02em',
                  color: '#c8102e',
                }}
              >
                YOU MEAN IT.
              </h1>
            </motion.div>
          </div>

          {/* Sub-copy */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: 1.7,
              color: '#86868b',
              maxWidth: '500px',
            }}
          >
            1-on-1 boxing coaching built around your goals.
            Whether you&apos;re a complete beginner or training to compete —
            every session is designed for you.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
          >
            <Link href="/book" className="btn-primary">
              Book Your First Session →
            </Link>
            <a
              href="#services"
              className="btn-secondary"
              style={{ fontSize: '0.8rem' }}
            >
              See What&apos;s Included ↓
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          opacity: chevronOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
        }}
        aria-hidden
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#424245',
          }}
        >
          Scroll
        </span>
        <div className="animate-scroll-indicator" style={{ color: '#c8102e' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
