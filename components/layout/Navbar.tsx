'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid #222222' : '1px solid transparent',
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 3rem)', height: '72px' }}
        >
          {/* Logo */}
          <Link href="/" aria-label="Limitless Box home" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'relative', height: '112px', width: '440px', flexShrink: 0 }}>
              <Image
                src="/LimitlessBox - White.png"
                alt="Limitless Box"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop CTA */}
          <Link href="/book" className="btn-primary hidden lg:inline-flex">
            Book a Session →
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
            aria-label="Open menu"
            style={{ minWidth: 44, minHeight: 44, justifyContent: 'center', alignItems: 'center' }}
          >
            <span className="block w-6 h-[2px] bg-[#f5f5f7]" />
            <span className="block w-6 h-[2px] bg-[#f5f5f7]" />
            <span className="block w-4 h-[2px] bg-[#f5f5f7]" />
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[200]"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[201] flex flex-col transition-transform duration-300"
        style={{
          width: 'min(320px, 85vw)',
          background: '#111111',
          borderLeft: '1px solid #222222',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          padding: '2rem',
        }}
      >
        <button
          onClick={() => setDrawerOpen(false)}
          className="self-end p-2 text-[#86868b] hover:text-[#f5f5f7] transition-colors"
          aria-label="Close menu"
          style={{ minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}
        >
          ✕
        </button>

        <nav className="flex flex-col gap-6 mt-8">
          {[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/#about' },
            { label: 'Services', href: '/#services' },
            { label: 'FAQ', href: '/#faq' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setDrawerOpen(false)}
              className="text-[#f5f5f7] hover:text-[#c8102e] transition-colors"
              style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '2rem', letterSpacing: '0.05em' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <Link
            href="/book"
            onClick={() => setDrawerOpen(false)}
            className="btn-primary w-full text-center"
            style={{ display: 'block', textAlign: 'center' }}
          >
            Book a Session →
          </Link>
        </div>
      </div>
    </>
  )
}
