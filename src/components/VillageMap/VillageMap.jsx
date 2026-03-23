import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInView } from '../../hooks/useParallax'
import { useTheme } from '../../context/ThemeContext'
import projects from '../../data/projects.json'
import s from './VillageMap.module.css'

/* ── Mini house SVG for road side ─────────────────────────── */
const RoadHouse = ({ project, hovered }) => {
  const c = project.color
  const glow = hovered ? `drop-shadow(0 0 16px ${c})` : 'none'
  const { isDark } = useTheme()
  const wall  = isDark ? '#8a5230' : '#c49060'
  const rf    = isDark ? '#b86828' : '#e8a050'
  const dr    = isDark ? '#1a0800' : '#7a4820'
  const win   = hovered ? c : (isDark ? '#f5a040' : '#ffd060')

  const t = project.houseType
  return (
    <svg viewBox="0 0 120 130" width="120" height="130" style={{ filter: glow, transition: 'filter 0.3s, transform 0.3s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}>
      {t === 'temple' && <>
        <rect x="10" y="62" width="100" height="68" fill={wall}/>
        <polygon points="2,62 60,8 118,62" fill={rf}/>
        <polygon points="16,8 60,0 104,8 88,28 32,28" fill={isDark?'#d88838':'#f0a848'}/>
        <rect x="44" y="88" width="32" height="42" fill={dr}/>
        <rect x="12" y="70" width="24" height="24" fill={win} opacity="0.9"/>
        <rect x="84" y="70" width="24" height="24" fill={win} opacity="0.9"/>
      </>}
      {t === 'tower' && <>
        <rect x="20" y="32" width="80" height="98" fill={wall}/>
        <polygon points="8,32 60,2 112,32" fill={rf}/>
        <rect x="44" y="90" width="32" height="40" fill={dr}/>
        <rect x="24" y="42" width="22" height="22" fill={win} opacity="0.9"/>
        <rect x="74" y="42" width="22" height="22" fill={win} opacity="0.9"/>
        <rect x="24" y="72" width="22" height="22" fill={win} opacity="0.7"/>
        <rect x="74" y="72" width="22" height="22" fill={win} opacity="0.7"/>
      </>}
      {t === 'hut' && <>
        <rect x="12" y="58" width="96" height="72" fill={wall}/>
        <polygon points="2,58 60,6 118,58" fill={rf}/>
        <rect x="44" y="88" width="32" height="42" fill={dr}/>
        <rect x="14" y="66" width="24" height="24" fill={win} opacity="0.9"/>
        <rect x="82" y="66" width="24" height="24" fill={win} opacity="0.9"/>
        {[0,1,2].map(i=>(<circle key={i} cx={50+i*10} cy={4} r="5" fill="#aaa" opacity="0.3"><animate attributeName="cy" values="4;-12;-26" dur={`${1.8+i*0.4}s`} repeatCount="indefinite"/><animate attributeName="opacity" values="0.3;0.08;0" dur={`${1.8+i*0.4}s`} repeatCount="indefinite"/><animate attributeName="r" values="5;10;16" dur={`${1.8+i*0.4}s`} repeatCount="indefinite"/></circle>))}
      </>}
      {t === 'school' && <>
        <rect x="6" y="55" width="108" height="75" fill={wall}/>
        <polygon points="0,55 60,6 120,55" fill={rf}/>
        <rect x="44" y="88" width="32" height="42" fill={dr}/>
        <rect x="10" y="64" width="26" height="26" fill={win} opacity="0.9"/>
        <rect x="84" y="64" width="26" height="26" fill={win} opacity="0.9"/>
        <rect x="52" y="16" width="16" height="18" fill={isDark?'#ffd700':'#e8b000'} opacity="0.8"/>
        <rect x="57" y="4" width="6" height="14" fill={isDark?'#8a4010':'#6a3010'}/>
        <circle cx="60" cy="3" r="5" fill="#c84010" opacity="0.9"/>
      </>}
    </svg>
  )
}

/* ── Bush SVG ──────────────────────────────────────────────── */
const Bush = ({ size = 40, isDark }) => {
  const c1 = isDark ? '#2a5a18' : '#3a8a28'
  const c2 = isDark ? '#1e4a12' : '#2d7020'
  const c3 = isDark ? '#366628' : '#4aa030'
  return (
    <svg viewBox="0 0 60 40" width={size} height={size * 0.65} style={{ display:'block' }}>
      <ellipse cx="30" cy="30" rx="28" ry="16" fill={c2}/>
      <ellipse cx="14" cy="22" rx="16" ry="14" fill={c1}/>
      <ellipse cx="46" cy="24" rx="14" ry="12" fill={c1}/>
      <ellipse cx="30" cy="16" rx="20" ry="16" fill={c3}/>
      <ellipse cx="30" cy="12" rx="12" ry="10" fill={c3}/>
    </svg>
  )
}

/* ── Tree SVG ──────────────────────────────────────────────── */
const Tree = ({ isDark }) => {
  const trunk = isDark ? '#4a2208' : '#7a5030'
  const body  = isDark ? '#1e4a12' : '#2d7020'
  const top   = isDark ? '#2a6618' : '#3d9028'
  return (
    <svg viewBox="0 0 60 90" width="50" height="80">
      <rect x="25" y="60" width="10" height="30" fill={trunk}/>
      <ellipse cx="30" cy="56" rx="22" ry="28" fill={body}/>
      <ellipse cx="30" cy="38" rx="16" ry="22" fill={top}/>
      <ellipse cx="30" cy="24" rx="10" ry="16" fill={top} opacity="0.8"/>
    </svg>
  )
}

/* ── Lamp post ─────────────────────────────────────────────── */
const LampPost = ({ isDark }) => (
  <svg viewBox="0 0 20 80" width="18" height="72">
    <rect x="8" y="0" width="4" height="72" fill={isDark?'#4a2208':'#7a5030'}/>
    <circle cx="10" cy="4" r="6" fill={isDark?'#ffd060':'#ffaa00'} opacity="0.9">
      <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="10" cy="4" r="12" fill={isDark?'#ffd060':'#ffaa00'} opacity="0.1">
      <animate attributeName="opacity" values="0.1;0.03;0.1" dur="2.5s" repeatCount="indefinite"/>
    </circle>
  </svg>
)

/* ── Project stop on road ──────────────────────────────────── */
const ProjectStop = ({ project, index, side }) => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [ref, inView] = useInView(0.12)
  const [hovered, setHovered] = useState(false)
  const isLeft = side === 'left'
  const delay = index * 0.15

  return (
    <div
      ref={ref}
      className={`${s.stop} ${isLeft ? s.stopLeft : s.stopRight}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? 'translateX(0)'
          : `translateX(${isLeft ? -80 : 80}px)`,
        transition: `opacity 0.8s ${delay}s cubic-bezier(0.23,1,0.32,1), transform 0.8s ${delay}s cubic-bezier(0.23,1,0.32,1)`,
      }}
    >
      {/* connector dashes */}
      <div className={s.connector} style={{ borderColor: hovered ? project.color : (isDark ? '#5c3010' : '#c8a060'), background: hovered ? `linear-gradient(${isLeft?'to left':'to right'},${project.color}40,transparent)` : 'none' }} />

      {/* Card */}
      <div
        className={s.houseCard}
        style={{ borderColor: hovered ? project.color : (isDark ? '#5c3010' : '#d4b080'), background: hovered ? (isDark ? `linear-gradient(135deg,#3d1e00,#2d1200)` : `linear-gradient(135deg,#fff8ee,#fef0d8)`) : (isDark ? 'linear-gradient(135deg,#2a1200,#1a0a00)' : 'linear-gradient(135deg,#fff8ee,#fef2dc)'), cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => navigate(`/project/${project.slug}`)}
      >
        {isLeft
          ? <>
              <div className={s.houseCardMeta}>
                <div className={s.houseMiniName} style={{ color: hovered ? project.color : (isDark?'#ffd880':'#7a3800') }}>{project.icon} {project.name}</div>
                <div className={s.houseMiniTag} style={{ color: isDark?'#8a5030':'#a06030' }}>{project.category} · {project.status}</div>
                <div className={s.houseMiniDesc} style={{ color: isDark?'#c09060':'#6a3a10' }}>{project.tagline}</div>
                <div className={s.enterBtn} style={{ color: hovered ? project.color : (isDark?'#c47a3a':'#a05520'), borderColor: hovered ? project.color : (isDark?'#5c3010':'#c8a060') }}>Enter home →</div>
              </div>
              <RoadHouse project={project} hovered={hovered} />
            </>
          : <>
              <RoadHouse project={project} hovered={hovered} />
              <div className={s.houseCardMeta}>
                <div className={s.houseMiniName} style={{ color: hovered ? project.color : (isDark?'#ffd880':'#7a3800') }}>{project.icon} {project.name}</div>
                <div className={s.houseMiniTag} style={{ color: isDark?'#8a5030':'#a06030' }}>{project.category} · {project.status}</div>
                <div className={s.houseMiniDesc} style={{ color: isDark?'#c09060':'#6a3a10' }}>{project.tagline}</div>
                <div className={s.enterBtn} style={{ color: hovered ? project.color : (isDark?'#c47a3a':'#a05520'), borderColor: hovered ? project.color : (isDark?'#5c3010':'#c8a060') }}>Enter home →</div>
              </div>
            </>
        }
      </div>
    </div>
  )
}

/* ── Main component ────────────────────────────────────────── */
export default function VillageMap() {
  const { isDark } = useTheme()
  const [ref, inView] = useInView(0.05)

  const roadFill  = isDark ? '#3d1800' : '#c8a060'
  const roadEdge  = isDark ? '#5c2a00' : '#b08040'
  const roadDash  = isDark ? 'rgba(255,216,128,0.22)' : 'rgba(100,60,0,0.25)'
  const grassFill = isDark ? '#1e3d10' : '#4a8830'
  const grassDark = isDark ? '#162e0c' : '#3a7020'
  const groundBg  = isDark ? '#0d0400' : '#fdf6e3'

  return (
    <section id="projects" className={s.section} style={{ background: isDark ? 'linear-gradient(180deg,#1a0800,#0d0400)' : 'linear-gradient(180deg,#fef0d0,#fdf6e3)' }}>

      {/* Header */}
      <div ref={ref} className={s.header} style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(40px)', transition:'all 0.8s cubic-bezier(0.23,1,0.32,1)' }}>
        <div className={s.headerIcon}>🏘️</div>
        <h2 className={s.headerTitle} style={{ color:isDark?'#ffd880':'#7a3800' }}>The Project Homes</h2>
        <p className={s.headerSub} style={{ color:isDark?'#c47a3a':'#a05520' }}>Walk the village road — click a house to step inside</p>
        <div className={s.divider} />
      </div>

      {/* Road scene */}
      <div className={s.roadWrap}>

        {/* Grass left */}
        <div className={s.grassPanel} style={{ background:`linear-gradient(90deg,${grassDark},${grassFill})` }}>
          {/* grass texture lines */}
          <svg className={s.grassTexture} viewBox="0 0 200 1200" preserveAspectRatio="xMidYMid slice">
            {[...Array(60)].map((_,i)=>{
              const x=(i*37+i*i*7)%190
              const y=(i*83+i*23)%1180
              return <path key={i} d={`M${x},${y+10} Q${x+3},${y} ${x+6},${y+10}`} fill="none" stroke={isDark?'#2a5018':'#5aaa38'} strokeWidth="1.5" opacity="0.6"/>
            })}
          </svg>

          {/* Bushes left */}
          <div className={s.decorCol}>
            {[0,1,2,3,4,5].map(i=>(
              <div key={i} className={s.decorItem} style={{ marginTop: i===0?60:0 }}>
                {i%3===0 ? <Tree isDark={isDark}/> : <Bush size={50} isDark={isDark}/>}
              </div>
            ))}
          </div>
        </div>

        {/* Road centre */}
        <div className={s.road} style={{ background:`linear-gradient(180deg,${roadFill} 0%,${roadEdge} 100%)` }}>
          {/* Road surface details */}
          <svg className={s.roadOverlay} viewBox="0 0 120 1400" preserveAspectRatio="xMidYMid meet">
            {/* centre dashes */}
            {[...Array(28)].map((_,i)=>(
              <rect key={i} x="56" y={30+i*48} width="8" height="26" rx="2" fill={roadDash}/>
            ))}
            {/* edge lines */}
            <line x1="12" y1="0" x2="12" y2="1400" stroke={isDark?'rgba(196,122,58,0.3)':'rgba(100,60,0,0.2)'} strokeWidth="2"/>
            <line x1="108" y1="0" x2="108" y2="1400" stroke={isDark?'rgba(196,122,58,0.3)':'rgba(100,60,0,0.2)'} strokeWidth="2"/>
          </svg>

          {/* Lamp posts on road edges */}
          <div className={s.lampsLeft}>
            {[80,280,480,680].map(t=>(
              <div key={t} style={{ position:'absolute', top:t }}><LampPost isDark={isDark}/></div>
            ))}
          </div>
          <div className={s.lampsRight}>
            {[180,380,580,780].map(t=>(
              <div key={t} style={{ position:'absolute', top:t }}><LampPost isDark={isDark}/></div>
            ))}
          </div>

          {/* Road end */}
          <div className={s.roadEnd} style={{ background:`radial-gradient(ellipse at 50% 100%, ${isDark?'#c47a3a':'#e8a040'}22 0%, transparent 60%)` }}/>
        </div>

        {/* Grass right */}
        <div className={s.grassPanel} style={{ background:`linear-gradient(270deg,${grassDark},${grassFill})` }}>
          <svg className={s.grassTexture} viewBox="0 0 200 1200" preserveAspectRatio="xMidYMid slice">
            {[...Array(60)].map((_,i)=>{
              const x=(i*41+i*i*11)%190
              const y=(i*79+i*29)%1180
              return <path key={i} d={`M${x},${y+10} Q${x+3},${y} ${x+6},${y+10}`} fill="none" stroke={isDark?'#2a5018':'#5aaa38'} strokeWidth="1.5" opacity="0.6"/>
            })}
          </svg>
          <div className={s.decorCol}>
            {[0,1,2,3,4,5].map(i=>(
              <div key={i} className={s.decorItem} style={{ marginTop: i===0?130:0 }}>
                {i%3===1 ? <Tree isDark={isDark}/> : <Bush size={55} isDark={isDark}/>}
              </div>
            ))}
          </div>
        </div>

        {/* Project stops — float left/right off road */}
        <div className={s.stopsOverlay}>
          {projects.map((p, i) => (
            <ProjectStop key={p.id} project={p} index={i} side={i%2===0?'left':'right'} />
          ))}
        </div>

      </div>
    </section>
  )
}
