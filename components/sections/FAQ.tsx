'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/animations'

const faqs = [
  {
    question: 'Where are sessions held?',
    answer: 'Sessions are held at [gym name / location in Mississauga]. Exact address provided upon booking. Parking is available.',
  },
  {
    question: 'How long is each session?',
    answer: 'Each session is 60 minutes — warm-up, technical work, conditioning, and cool-down. Every minute is used intentionally.',
  },
  {
    question: 'What should I bring / wear?',
    answer: 'Wear comfortable training clothes and athletic shoes with good lateral support. Bring water — you\'ll need it. Hand wraps and gloves are required (see below).',
  },
  {
    question: 'Do I need my own gloves and wraps?',
    answer: 'Hand wraps are required and can be loaned for your first session. Boxing gloves are required — we have loaners for your first session, but you\'ll want your own pair if you continue training.',
  },
  {
    question: "What's your cancellation policy?",
    answer: 'Please cancel or reschedule at least 24 hours before your session. Late cancellations or no-shows may be subject to a fee.',
  },
  {
    question: 'Can complete beginners book?',
    answer: 'Absolutely. Most clients start with zero experience. The beginner program is specifically designed to get you comfortable and competent from the ground up.',
  },
  {
    question: 'Do you offer packages or only single sessions?',
    answer: 'Both. Single sessions are available for flexibility. Package bundles (5 or 10 sessions) are available at a discounted rate. Ask about packages when booking.',
  },
]

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      ref={ref}
      style={{
        padding: 'var(--section-pad) var(--gutter)',
        background: '#080808',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 'var(--gutter)', right: 'var(--gutter)', height: '1px', background: '#222222' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Left — heading */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ position: 'sticky', top: '6rem', height: 'fit-content' }}
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
              FAQ
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
              GOOD<br />QUESTIONS.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: '#86868b',
                marginTop: '1.25rem',
              }}
            >
              Anything else? Email coach@limitlessbox.ca
            </motion.p>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.question}
                variants={fadeUp}
                style={{ borderBottom: '1px solid #1a1a1a' }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: '1.5rem 0',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    textAlign: 'left',
                    minHeight: 44,
                  }}
                  aria-expanded={openIndex === i}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 500,
                      fontSize: '1rem',
                      color: openIndex === i ? '#f5f5f7' : '#86868b',
                      transition: 'color 0.2s',
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      border: `1px solid ${openIndex === i ? '#c8102e' : '#222222'}`,
                      color: openIndex === i ? '#c8102e' : '#86868b',
                      fontSize: '1rem',
                      fontWeight: 300,
                      transition: 'all 0.2s',
                      transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: '0.9rem',
                          lineHeight: 1.8,
                          color: '#86868b',
                          paddingBottom: '1.5rem',
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
