'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/animations'

const steps = [
  {
    number: '01',
    title: 'BOOK',
    description: 'Pick a slot that fits your schedule. First-time? Book the intro session.',
  },
  {
    number: '02',
    title: 'SHOW UP',
    description: "Your first session is all about assessing where you're at and building the foundation.",
  },
  {
    number: '03',
    title: 'LEVEL UP',
    description: 'Track your progress every session. Book the next one and keep building.',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        padding: 'var(--section-pad) var(--gutter)',
        background: '#080808',
        position: 'relative',
      }}
    >
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
            The Process
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
            THREE STEPS.<br />THAT&apos;S IT.
          </motion.h2>
        </motion.div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '2px',
            position: 'relative',
          }}
          className="md:grid-cols-3"
        >
          {/* Connecting line (desktop only) */}
          <div
            aria-hidden
            className="hidden md:block"
            style={{
              position: 'absolute',
              top: '3.5rem',
              left: '16.6%',
              right: '16.6%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #c8102e 20%, #c8102e 80%, transparent)',
              opacity: 0.4,
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                background: '#111111',
                position: 'relative',
                zIndex: 1,
              }}
              className="md:text-left"
            >
              {/* Step number */}
              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                {/* Glow circle behind number */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: '-12px',
                    background: 'radial-gradient(circle, rgba(200,16,46,0.12) 0%, transparent 70%)',
                    borderRadius: '50%',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-bebas-neue)',
                    fontSize: 'clamp(3.5rem, 7vw, 5rem)',
                    lineHeight: 1,
                    color: '#c8102e',
                    letterSpacing: '0.02em',
                    position: 'relative',
                  }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-bebas-neue)',
                  fontSize: '1.75rem',
                  letterSpacing: '0.06em',
                  color: '#f5f5f7',
                  lineHeight: 1,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.925rem',
                  lineHeight: 1.7,
                  color: '#86868b',
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
