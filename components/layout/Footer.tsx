import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid #222222',
        background: '#080808',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem) 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Limitless Box home" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
              <div style={{ position: 'relative', height: '96px', width: '380px', flexShrink: 0 }}>
                <Image
                  src="/LimitlessBox - White.png"
                  alt="Limitless Box"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left center' }}
                />
              </div>
            </Link>
            <p style={{ color: '#86868b', fontSize: '0.875rem', maxWidth: '260px', lineHeight: 1.6 }}>
              Personal boxing coaching in Mississauga. 1-on-1. Built around you.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <div className="flex flex-col gap-3">
              <span style={{ color: '#424245', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Site
              </span>
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/#about' },
                { label: 'Services', href: '/#services' },
                { label: 'FAQ', href: '/#faq' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ color: '#86868b', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                  className="hover:text-[#f5f5f7]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span style={{ color: '#424245', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Connect
              </span>
              <a
                href="mailto:coach@limitlessbox.ca"
                style={{ color: '#86868b', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                className="hover:text-[#f5f5f7]"
              >
                coach@limitlessbox.ca
              </a>
              <a
                href="https://instagram.com/limitlessbox.ca"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#86868b', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                className="hover:text-[#f5f5f7]"
              >
                @limitlessbox.ca
              </a>
              <span style={{ color: '#86868b', fontSize: '0.875rem' }}>
                📍 Mississauga, ON
              </span>
            </div>
          </nav>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #222222', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p style={{ color: '#424245', fontSize: '0.75rem' }}>
              © {year} Limitless Box. All rights reserved.
            </p>
            <Link
              href="/book"
              style={{ color: '#c8102e', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              Book a Session →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
