'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { fadeUp, slideInLeft, slideInRight, stagger } from '@/lib/animations'

const photos = [
  '/JP25-1.jpg',
  '/JP25-2.jpg',
  '/JP25-3.jpg',
]

const credentials = [
  { icon: '🥊', label: 'Golden Gloves Competitor' },
  { icon: '✓', label: 'Certified Boxing Coach' },
  { icon: '⚡', label: '8+ Years Experience' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setCurrent((i) => (i + 1) % photos.length)

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
          {/* Carousel */}
          <div className="animate-float" style={{ position: 'relative' }}>
            {/* Image */}
            <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '16px', overflow: 'hidden', border: '1px solid #222222' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Image
                    src={photos[current]}
                    alt={`Justin Parina photo ${current + 1}`}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    priority={current === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Red accent border glow on right edge */}
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: '3px',
                background: 'linear-gradient(to bottom, transparent, #c8102e, transparent)',
                zIndex: 2,
              }} />

              {/* Prev / Next buttons */}
              <button
                onClick={prev}
                aria-label="Previous photo"
                style={{
                  position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  zIndex: 3, background: 'rgba(8,8,8,0.6)', backdropFilter: 'blur(8px)',
                  border: '1px solid #333', borderRadius: '50%',
                  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#f5f5f7',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button
                onClick={next}
                aria-label="Next photo"
                style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  zIndex: 3, background: 'rgba(8,8,8,0.6)', backdropFilter: 'blur(8px)',
                  border: '1px solid #333', borderRadius: '50%',
                  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#f5f5f7',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  style={{
                    width: i === current ? 20 : 6, height: 6,
                    borderRadius: '9999px',
                    background: i === current ? '#c8102e' : '#333',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
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
            [JUSTIN PARINA]
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
