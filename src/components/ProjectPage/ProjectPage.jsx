import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import projects from '../../data/projects.json'
import s from './ProjectPage.module.css'

/* ── Room walls that rotate in on scroll ─────────────────── */
const SECTIONS = [
  { id: 'about',      label: '📖 About',      wallDir: 'front' },
  { id: 'highlights', label: '⚡ Highlights',  wallDir: 'left'  },
  { id: 'stack',      label: '🛠️ Stack',       wallDir: 'right' },
  { id: 'others',     label: '🏘️ More',        wallDir: 'back'  },
]

/* ── Door entrance animation svg ─────────────────────────── */
const DoorSVG = ({ color, isDark }) => (
  <svg viewBox="0 0 280 300" width="220" height="240">
    <defs>
      <radialGradient id="doorGlow" cx="50%" cy="50%">
        <stop offset="0%"   stopColor={color} stopOpacity="0.5"/>
        <stop offset="100%" stopColor={color} stopOpacity="0"/>
      </radialGradient>
    </defs>
    {/* Frame */}
    <rect x="40" y="60" width="200" height="240" rx="4" fill={isDark?'#5c3010':'#9a6030'} stroke={color} strokeWidth="2"/>
    {/* Door panels */}
    <rect x="52" y="72" width="80" height="110" rx="3" fill={isDark?'#7a4820':'#c08040'} stroke={color} strokeWidth="1" opacity="0.8"/>
    <rect x="148" y="72" width="80" height="110" rx="3" fill={isDark?'#7a4820':'#c08040'} stroke={color} strokeWidth="1" opacity="0.8"/>
    <rect x="52" y="196" width="176" height="92" rx="3" fill={isDark?'#7a4820':'#c08040'} stroke={color} strokeWidth="1" opacity="0.8"/>
    {/* Glow */}
    <ellipse cx="140" cy="210" rx="100" ry="80" fill="url(#doorGlow)"/>
    {/* Arch window */}
    <path d="M80,72 Q140,20 200,72" fill={isDark?'#1a0800':'#7a4820'} stroke={color} strokeWidth="1"/>
    <path d="M80,72 Q140,30 200,72" fill={color} opacity="0.15"/>
    {/* Handle */}
    <circle cx="148" cy="142" r="7" fill={color} opacity="0.9"/>
    <circle cx="132" cy="142" r="7" fill={color} opacity="0.9"/>
    {/* Ground glow */}
    <ellipse cx="140" cy="295" rx="90" ry="12" fill={color} opacity="0.15"/>
  </svg>
)

/* ── Room wall component ──────────────────────────────────── */
const RoomWall = ({ section, project, index, active, isDark }) => {
  const transforms = {
    front: { enter: 'rotateX(0deg)',  exit: 'rotateX(-12deg) translateY(-40px)',   delay: 0 },
    left:  { enter: 'rotateY(0deg)',  exit: 'rotateY(18deg)  translateX(60px)',    delay: 0 },
    right: { enter: 'rotateY(0deg)',  exit: 'rotateY(-18deg) translateX(-60px)',   delay: 0 },
    back:  { enter: 'rotateX(0deg)',  exit: 'rotateX(12deg)  translateY(40px)',    delay: 0 },
  }
  const t = transforms[section.wallDir]
  return (
    <div
      id={`wall-${section.id}`}
      className={s.wall}
      style={{
        transform:  active ? t.enter : t.exit,
        opacity:    active ? 1 : 0,
        transition: `transform 0.9s ${active ? index*0.08 : 0}s cubic-bezier(0.23,1,0.32,1), opacity 0.7s ${active ? index*0.06 : 0}s`,
        background: isDark
          ? `linear-gradient(135deg,rgba(45,22,0,0.95),rgba(26,12,0,0.98))`
          : `linear-gradient(135deg,rgba(255,248,230,0.97),rgba(253,240,210,0.99))`,
        borderColor: active ? project.color : (isDark?'#3d1800':'#e0b870'),
      }}
    >
      {/* Wall accent top */}
      <div className={s.wallAccent} style={{ background:`linear-gradient(90deg,transparent,${project.color},transparent)` }}/>

      {/* Section label */}
      <div className={s.wallLabel} style={{ color: project.color }}>{section.label}</div>

      {/* Content */}
      {section.id === 'about' && (
        <div className={s.wallContent}>
          <p className={s.wallText} style={{ color:isDark?'#e5c090':'#5a2e10' }}>{project.description}</p>
          <div className={s.wallMeta}>
            {[
              { k:'Company',  v: project.company },
              { k:'Period',   v: project.period },
              { k:'Role',     v: project.role },
              { k:'Status',   v: project.status },
              { k:'Category', v: project.category },
            ].map(m=>(
              <div key={m.k} className={s.metaRow}>
                <span className={s.metaKey} style={{ color:isDark?'#c47a3a':'#a05520' }}>{m.k}</span>
                <span className={s.metaVal} style={{ color:isDark?'#f5d0a0':'#5a2e10' }}>{m.v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {section.id === 'highlights' && (
        <ul className={`${s.wallContent} ${s.hlList}`}>
          {project.highlights.map((h,i)=>(
            <li key={i} className={s.hlItem} style={{ color:isDark?'#e5c090':'#5a2e10' }}>
              <span className={s.hlBullet} style={{ background: project.color, boxShadow:`0 0 8px ${project.color}` }}/>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {section.id === 'stack' && (
        <div className={`${s.wallContent} ${s.stackWall}`}>
          {project.stack.map(tech=>(
            <span key={tech} className={s.stackPill} style={{ borderColor: project.color, color:isDark?'#fde8a0':'#7a3800', background:isDark?'rgba(196,122,58,0.12)':'rgba(196,122,58,0.1)' }}>{tech}</span>
          ))}
        </div>
      )}

      {section.id === 'others' && (
        <div className={`${s.wallContent} ${s.othersWall}`}>
          <OtherProjects current={project} isDark={isDark}/>
        </div>
      )}
    </div>
  )
}

/* ── Other projects mini list ─────────────────────────────── */
const OtherProjects = ({ current, isDark }) => {
  const navigate = useNavigate()
  const others = projects.filter(p=>p.id!==current.id)
  return (
    <div className={s.otherList}>
      {others.map(p=>(
        <div key={p.id} className={s.otherItem}
          style={{ borderColor:isDark?'#5c3010':'#d4b080', color:isDark?'#f5d0a0':'#5a2e10', cursor:'pointer' }}
          onClick={()=>navigate(`/project/${p.slug}`)}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=p.color;e.currentTarget.style.transform='translateX(6px)'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=isDark?'#5c3010':'#d4b080';e.currentTarget.style.transform='translateX(0)'}}>
          <span style={{fontSize:'1.6rem'}}>{p.icon}</span>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'0.98rem',fontWeight:700,color:p.color}}>{p.name}</div>
            <div style={{fontFamily:"'Crimson Text',serif",fontSize:'0.8rem',color:isDark?'#8a5030':'#a06030',textTransform:'uppercase',letterSpacing:'0.08em'}}>{p.category}</div>
          </div>
          <span style={{marginLeft:'auto',color:isDark?'#5c3010':'#c8a060'}}>→</span>
        </div>
      ))}
    </div>
  )
}

/* ── Room ambience SVG (ceiling + floor) ─────────────────── */
const RoomAmbience = ({ color, isDark }) => (
  <div className={s.roomAmbience}>
    <svg className={s.ceiling} viewBox="0 0 900 120" preserveAspectRatio="xMidYMid slice">
      <rect width="900" height="120" fill={isDark?'#1a0800':'#fdf0d8'}/>
      {/* cornices */}
      <path d="M0,110 Q225,85 450,110 Q675,135 900,110 L900,120 L0,120Z" fill={isDark?'#2a1000':'#edd090'} opacity="0.6"/>
      {/* hanging lantern */}
      <line x1="450" y1="0" x2="450" y2="55" stroke={isDark?'#8a5030':'#c4923a'} strokeWidth="2"/>
      <ellipse cx="450" cy="60" rx="22" ry="30" fill={isDark?'#c47a3a':'#e8a050'} opacity="0.9"/>
      <circle cx="450" cy="60" r="12" fill={color} opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="450" cy="60" r="35" fill={color} opacity="0.08">
        <animate attributeName="opacity" values="0.08;0.02;0.08" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      {/* Side wall brackets */}
      <rect x="50" y="20" width="60" height="8" rx="4" fill={isDark?'#5c3010':'#c09050'} opacity="0.5"/>
      <rect x="790" y="20" width="60" height="8" rx="4" fill={isDark?'#5c3010':'#c09050'} opacity="0.5"/>
    </svg>
    <svg className={s.floor} viewBox="0 0 900 80" preserveAspectRatio="xMidYMid slice">
      <rect width="900" height="80" fill={isDark?'#0d0400':'#e8d090'}/>
      {/* floor boards */}
      {[0,1,2,3,4,5,6,7,8].map(i=>(
        <rect key={i} x={i*100} y="0" width="100" height="80" fill="none" stroke={isDark?'#2a1000':'#c8a060'} strokeWidth="1" opacity="0.4"/>
      ))}
      <path d="M0,0 Q450,30 900,0" fill={isDark?'#1a0800':'#f0d8a0'} opacity="0.3"/>
    </svg>
  </div>
)

/* ── Scroll dots nav ──────────────────────────────────────── */
const ScrollDots = ({ activeIdx, project }) => (
  <div className={s.scrollDots}>
    {SECTIONS.map((sec,i)=>(
      <div key={sec.id} className={s.dot}
        style={{ background: i<=activeIdx ? project.color : 'rgba(196,122,58,0.25)', boxShadow: i===activeIdx ? `0 0 10px ${project.color}` : 'none' }}
        onClick={()=>document.getElementById(`wall-${sec.id}`)?.scrollIntoView({behavior:'smooth'})}
      />
    ))}
  </div>
)

/* ── Main export ──────────────────────────────────────────── */
export default function ProjectPage() {
  const { slug } = useParams()
  const navigate  = useNavigate()
  const { isDark } = useTheme()
  const project  = projects.find(p=>p.slug===slug)
  const [activeIdx, setActiveIdx] = useState(0)
  const [entered, setEntered] = useState(false)
  const containerRef = useRef(null)

  useEffect(()=>{ window.scrollTo(0,0); setTimeout(()=>setEntered(true),100); return ()=>setEntered(false) },[slug])

  // Intersection observer to track which wall is active
  useEffect(()=>{
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const idx = SECTIONS.findIndex(s=>`wall-${s.id}`===e.target.id)
          if(idx>=0) setActiveIdx(idx)
        }
      })
    },{ threshold:0.4 })
    SECTIONS.forEach(sec=>{
      const el=document.getElementById(`wall-${sec.id}`)
      if(el) obs.observe(el)
    })
    return ()=>obs.disconnect()
  },[slug])

  if(!project) return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20,fontFamily:"'Crimson Text',serif",fontSize:'1.2rem',color:'#c47a3a'}}>
      <p>Project not found.</p>
      <button onClick={()=>navigate('/')} style={{fontFamily:"'Crimson Text',serif",fontSize:'1rem',color:'#f5d0a0',background:'rgba(26,8,0,0.85)',border:'1px solid #c47a3a',borderRadius:30,padding:'8px 20px',cursor:'pointer'}}>← Back to Village</button>
    </div>
  )

  return (
    <div className={s.page} style={{ background: isDark ? '#0d0400' : '#fdf6e3' }} ref={containerRef}>

      {/* Back */}
      <button className={s.back} style={{ background: isDark?'rgba(13,4,0,0.88)':'rgba(253,246,227,0.92)', borderColor: '#c47a3a', color: isDark?'#f5d0a0':'#7a3800' }}
        onClick={()=>{ navigate('/'); setTimeout(()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'}),120) }}>
        ← Back to Village
      </button>

      <ScrollDots activeIdx={activeIdx} project={project}/>

      {/* ── Entrance ──────────────────────────────────────── */}
      <div className={s.entrance} style={{
        opacity: entered?1:0,
        transform: entered?'translateY(0)':'translateY(30px)',
        transition:'all 0.8s cubic-bezier(0.23,1,0.32,1)',
        background: isDark?'linear-gradient(180deg,#1a0800,#0d0400)':'linear-gradient(180deg,#fef0d0,#fdf6e3)'
      }}>
        <div className={s.entranceGlow} style={{ background:`radial-gradient(ellipse at 50% 60%, ${project.color}1a 0%, transparent 65%)` }}/>

        <DoorSVG color={project.color} isDark={isDark}/>

        <div className={s.entranceText}>
          <div className={s.entranceBadge} style={{ borderColor:project.color, color:project.color }}>{project.category} · {project.status}</div>
          <h1 className={s.entranceTitle} style={{ color: isDark?project.color:project.color, textShadow:`0 0 50px ${project.color}60` }}>
            {project.icon} {project.name}
          </h1>
          <p className={s.entranceTagline} style={{ color: isDark?'#c47a3a':'#a05520' }}>{project.tagline}</p>
          <p className={s.entranceCue} style={{ color: isDark?'#8a5030':'#c49060' }}>Scroll inside to explore ↓</p>
        </div>
      </div>

      {/* ── Interior room ─────────────────────────────────── */}
      <div className={s.room} style={{ background: isDark?'#0d0400':'#fdf0d8' }}>

        <RoomAmbience color={project.color} isDark={isDark}/>

        {/* Room walls */}
        <div className={s.walls}>
          {SECTIONS.map((sec,i)=>(
            <RoomWall key={sec.id} section={sec} project={project} index={i}
              active={entered && i<=activeIdx+1}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Corner decoration */}
        <div className={s.cornerDeco} style={{ borderColor: isDark?'#3d1800':'#e0c090' }}>
          <div style={{ fontSize:'2rem' }}>{project.icon}</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.85rem', color:isDark?'#8a5030':'#a06030', marginTop:4 }}>
            {project.name}
          </div>
        </div>
      </div>

    </div>
  )
}
