'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/animations'

const testimonials = [
  {
    quote: "I had zero experience when I started. After 3 months of 1-on-1 sessions, I competed in my first white-collar bout and won. I wouldn't have done it without the structure and patience in every session.",
    name: 'Sarah M.',
    context: 'Boxing beginner → White-collar competitor',
    rating: 5,
  },
  {
    quote: "Best decision I made for my fitness. I've tried group classes before and nothing compares to having every single rep corrected. My footwork completely transformed in 6 weeks.",
    name: 'Marcus T.',
    context: 'Trained for 6 months',
    rating: 5,
  },
  {
    quote: "The sessions are intense but the coaching is unreal. He finds what you're weak at and makes it your strength. I came in nervous. Left feeling like I could handle anything.",
    name: 'Priya K.',
    context: 'Fitness & self-defence focus',
    rating: 5,
  },
  {
    quote: "Legit the most efficient training I've ever done. No fluff, no wasted time. Every minute of the hour has a purpose. Already booked 10 more sessions.",
    name: 'Jordan L.',
    context: 'Amateur fighter prep',
    rating: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" fill="#c8102e" style={{ width: 12, height: 12 }}>
          <path d="M6 1l1.545 3.13L11 4.635l-2.5 2.435.59 3.44L6 8.885l-3.09 1.625L3.5 7.07 1 4.635l3.455-.505L6 1z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        padding: 'var(--section-pad) var(--gutter)',
        background: '#0a0a0a',
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
            Results
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
            WHAT PEOPLE SAY.
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              style={{
                background: '#111111',
                border: '1px solid #1a1a1a',
                borderRadius: '16px',
                padding: 'clamp(1.5rem, 4vw, 2rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                transition: 'border-color 0.2s',
              }}
              className="hover:border-[#2a2a2a]"
            >
              {/* Large quote mark */}
              <span
                aria-hidden
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '4rem',
                  lineHeight: 0.8,
                  color: '#c8102e',
                  opacity: 0.7,
                  userSelect: 'none',
                }}
              >
                "
              </span>

              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: '#f5f5f7',
                  flex: 1,
                }}
              >
                {t.quote}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid #1a1a1a', paddingTop: '1rem' }}>
                <Stars count={t.rating} />
                <div>
                  <p style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 600, fontSize: '0.875rem', color: '#f5f5f7' }}>
                    — {t.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: '#86868b', marginTop: '0.15rem' }}>
                    {t.context}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.75rem',
            color: '#424245',
            fontStyle: 'italic',
          }}
        >
          Placeholder testimonials — replace with 4–6 real testimonials from client before launch.
        </motion.p>
      </div>
    </section>
  )
}
