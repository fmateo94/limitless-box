'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 8,   suffix: '+', label: 'Years Coaching' },
  { value: 200, suffix: '+', label: 'Clients Trained' },
  { value: 4.9, suffix: '★', label: 'Average Rating' },
  { value: 12,  suffix: '',  label: 'Pro Fighters Coached' },
]

function CountUp({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const isDecimal = !Number.isInteger(target)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * target)
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {isDecimal ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{
        borderTop: '1px solid #222222',
        borderBottom: '1px solid #222222',
        background: '#080808',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3rem)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2px',
        }}
        className="md:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.5rem 1rem',
              position: 'relative',
            }}
          >
            {/* Divider between items (not on last) */}
            {i < stats.length - 1 && (
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '20%',
                  height: '60%',
                  width: '1px',
                  background: '#222222',
                }}
                className="hidden md:block"
              />
            )}
            <span
              style={{
                fontFamily: 'var(--font-bebas-neue)',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                lineHeight: 1,
                color: '#f5f5f7',
                letterSpacing: '0.02em',
              }}
            >
              {inView ? (
                <CountUp target={stat.value} suffix={stat.suffix} />
              ) : (
                `0${stat.suffix}`
              )}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#86868b',
                marginTop: '0.5rem',
                textAlign: 'center',
              }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
