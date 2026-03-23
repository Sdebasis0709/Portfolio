import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useScrollY } from '../../hooks/useParallax'
import { useTheme } from '../../context/ThemeContext'
import s from './Nav.module.css'

const LINKS = [
  { label: '🏡 Hut',      id: 'about' },
  { label: '🏪 Bazaar',   id: 'skills' },
  { label: '🛤️ Road',     id: 'experience' },
  { label: '🏘️ Projects', id: 'projects' },
  { label: '🌳 Tree',     id: 'education' },
  { label: '⛲ Well',     id: 'contact' },
]

export default function Nav() {
  const scrollY    = useScrollY()
  const navigate   = useNavigate()
  const loc        = useLocation()
  const { isDark } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = loc.pathname === '/'
  const visible = scrollY > 80 || !isHome

  const navBg     = isDark ? 'rgba(13,4,0,0.92)'       : 'rgba(253,246,227,0.96)'
  const borderCol = isDark ? 'rgba(196,122,58,0.25)'   : 'rgba(196,122,58,0.35)'
  const logoCol   = isDark ? '#ffd880'                  : '#7a3800'
  const linkCol   = isDark ? '#c47a3a'                  : '#a05520'
  const burgerCol = isDark ? '#c47a3a'                  : '#a05520'
  const menuBg    = isDark ? 'rgba(13,4,0,0.97)'        : 'rgba(253,246,227,0.98)'

  const scrollTo = (id) => {
    setMenuOpen(false)
    if (!isHome) {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={s.nav} style={{
        opacity:         visible ? 1 : 0,
        transform:       visible ? 'translateY(0)' : 'translateY(-100%)',
        background:      navBg,
        borderBottomColor: borderCol,
        transition:      'opacity 0.4s, transform 0.4s, background 0.4s',
      }}>
        {/* Logo */}
        <button className={s.logo} style={{ color: logoCol }}
          onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }}>
          🌾 <span>Debasis</span>
        </button>

        {/* Desktop links */}
        <div className={s.desktopLinks}>
          {LINKS.map(l => (
            <button key={l.id} className={s.link} style={{ color: linkCol }}
              onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className={s.burger}
          style={{ color: burgerCol, borderColor: borderCol }}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            /* X icon */
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          ) : (
            /* House/hamburger hybrid icon */
            <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
              {/* roof = triangle lines suggesting a house */}
              <polyline points="2,10 12,2 22,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              {/* body lines = hamburger lines */}
              <line x1="4" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="4" y1="21" x2="20" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={s.mobileMenu} style={{
        background:    menuBg,
        borderColor:   borderCol,
        transform:     menuOpen ? 'translateY(0)' : 'translateY(-8px)',
        opacity:       menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition:    'transform 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.3s',
      }}>
        {LINKS.map((l, i) => (
          <button key={l.id} className={s.mobileLink}
            style={{
              color:             linkCol,
              borderBottomColor: borderCol,
              transitionDelay:   menuOpen ? `${i * 0.04}s` : '0s',
              opacity:           menuOpen ? 1 : 0,
              transform:         menuOpen ? 'translateX(0)' : 'translateX(-12px)',
              transition:        `opacity 0.3s ${menuOpen ? i * 0.04 : 0}s, transform 0.35s ${menuOpen ? i * 0.04 : 0}s cubic-bezier(0.23,1,0.32,1), background 0.2s, color 0.2s`,
            }}
            onClick={() => scrollTo(l.id)}
            onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(196,122,58,0.12)' : 'rgba(196,122,58,0.1)'; e.currentTarget.style.color = isDark ? '#ffd880' : '#7a3800' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = linkCol }}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Backdrop to close menu */}
      {menuOpen && (
        <div className={s.backdrop} onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}
