import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.style.setProperty('--bg-base',       '#0d0400')
      root.style.setProperty('--bg-section',    '#1a0800')
      root.style.setProperty('--bg-alt',        '#0d0400')
      root.style.setProperty('--bg-card',       '#2d1500')
      root.style.setProperty('--bg-card2',      '#1e0e00')
      root.style.setProperty('--text-primary',  '#ffd880')
      root.style.setProperty('--text-body',     '#e5c090')
      root.style.setProperty('--text-muted',    '#c47a3a')
      root.style.setProperty('--text-dim',      '#8a5030')
      root.style.setProperty('--border-main',   '#5c3010')
      root.style.setProperty('--border-accent', '#c47a3a')
      root.style.setProperty('--sky-top',       '#1a0a00')
      root.style.setProperty('--sky-mid',       '#7a2e00')
      root.style.setProperty('--sky-bot',       '#e8903a')
      root.style.setProperty('--road-fill',     '#2a1000')
      root.style.setProperty('--ground-fill',   '#3d1800')
      root.style.setProperty('--grass-fill',    '#2d5a1b')
      root.style.setProperty('--nav-bg',        'rgba(13,4,0,0.88)')
      document.body.style.background = '#0d0400'
      document.body.style.color = '#f5d0a0'
    } else {
      root.style.setProperty('--bg-base',       '#fdf6e3')
      root.style.setProperty('--bg-section',    '#fef9f0')
      root.style.setProperty('--bg-alt',        '#fdf0d8')
      root.style.setProperty('--bg-card',       '#fff8ee')
      root.style.setProperty('--bg-card2',      '#fef2dc')
      root.style.setProperty('--text-primary',  '#7a3800')
      root.style.setProperty('--text-body',     '#5a2e10')
      root.style.setProperty('--text-muted',    '#a05520')
      root.style.setProperty('--text-dim',      '#c47a3a')
      root.style.setProperty('--border-main',   '#e0b880')
      root.style.setProperty('--border-accent', '#c47a3a')
      root.style.setProperty('--sky-top',       '#87ceeb')
      root.style.setProperty('--sky-mid',       '#f5c870')
      root.style.setProperty('--sky-bot',       '#fde8a0')
      root.style.setProperty('--road-fill',     '#c8a060')
      root.style.setProperty('--ground-fill',   '#d4b070')
      root.style.setProperty('--grass-fill',    '#5a9e35')
      root.style.setProperty('--nav-bg',        'rgba(253,246,227,0.92)')
      document.body.style.background = '#fdf6e3'
      document.body.style.color = '#5a2e10'
    }
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}
