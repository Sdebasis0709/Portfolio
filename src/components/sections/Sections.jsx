import { useInView } from '../../hooks/useParallax'
import { useTheme } from '../../context/ThemeContext'
import s from './Sections.module.css'

/* ─────────────────────────────────────────────────────────────
   SHARED PRIMITIVES
───────────────────────────────────────────────────────────── */
export const SectionWrap = ({ id, children, alt = false }) => {
  const { isDark } = useTheme()
  const bg = alt
    ? (isDark ? 'linear-gradient(180deg,#0d0400,#1a0800)' : 'linear-gradient(180deg,#fdf0d0,#fdf6e3)')
    : (isDark ? 'linear-gradient(180deg,#1a0800,#0d0400)' : 'linear-gradient(180deg,#fef8ee,#fdf0d0)')
  return <section id={id} className={s.section} style={{ background: bg }}>{children}</section>
}

export const SectionTitle = ({ emoji, title, subtitle }) => {
  const { isDark } = useTheme()
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={s.sTitle}
      style={{ opacity: inView?1:0, transform: inView?'translateY(0)':'translateY(36px)', transition:'all 0.8s cubic-bezier(0.23,1,0.32,1)' }}>
      <div className={s.sTitleEmoji}>{emoji}</div>
      <h2 className={s.sTitleText} style={{ color: isDark?'#ffd880':'#7a3800' }}>{title}</h2>
      {subtitle && <p className={s.sTitleSub} style={{ color: isDark?'#c47a3a':'#a05520' }}>{subtitle}</p>}
      <div className={s.sTitleLine} />
    </div>
  )
}

const Card = ({ children, isDark, style = {}, className = '' }) => (
  <div className={`${s.card} ${className}`}
    style={{
      background: isDark ? 'linear-gradient(135deg,#2d1500,#1e0e00)' : 'linear-gradient(135deg,#fff8ee,#fef2dc)',
      border: `1px solid ${isDark ? '#5c3010' : '#e0c090'}`,
      ...style,
    }}>
    {children}
  </div>
)

/* ─────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────── */
export function About() {
  const { isDark } = useTheme()
  const [ref, inView] = useInView()
  const wall  = isDark ? '#8b5e3c' : '#c49060'
  const roof  = isDark ? '#c47a3a' : '#e8a050'
  const win   = isDark ? '#f5a040' : '#ffd060'
  const door  = isDark ? '#1a0800' : '#7a4820'
  const gnd   = isDark ? '#2a1000' : '#c8a060'
  const txt   = isDark ? '#e5c090' : '#5a2e10'
  const bold  = isDark ? '#ffd880' : '#7a3800'

  return (
    <SectionWrap id="about">
      <SectionTitle emoji="🏡" title="The Hut — About Me" subtitle="Where the journey begins" />
      <div ref={ref} className={s.aboutGrid}>
        {/* Hut illustration */}
        <div style={{ opacity:inView?1:0, transform:inView?'translateX(0)':'translateX(-60px)', transition:'all 0.9s 0.15s cubic-bezier(0.23,1,0.32,1)', display:'flex', justifyContent:'center' }}>
          <svg viewBox="0 0 300 280" width="300" style={{ maxWidth:'100%' }}>
            <defs>
              <radialGradient id="hw" cx="50%" cy="75%">
                <stop offset="0%" stopColor={win} stopOpacity="0.55"/>
                <stop offset="100%" stopColor={win} stopOpacity="0"/>
              </radialGradient>
            </defs>
            <ellipse cx="150" cy="268" rx="138" ry="15" fill={gnd} opacity="0.45"/>
            <rect x="48" y="138" width="204" height="142" fill={wall}/>
            <polygon points="28,138 150,38 272,138" fill={roof}/>
            <polygon points="28,138 150,56 272,138" fill="#d48540" opacity="0.4"/>
            <rect x="110" y="196" width="80" height="84" fill={door}/>
            <rect x="56"  y="154" width="60" height="60" rx="2" fill={win} opacity="0.88"/>
            <rect x="56"  y="154" width="60" height="60" rx="2" fill="url(#hw)"/>
            <rect x="184" y="154" width="60" height="60" rx="2" fill={win} opacity="0.88"/>
            <rect x="184" y="154" width="60" height="60" rx="2" fill="url(#hw)"/>
            {[0,1,2].map(i=>(
              <circle key={i} cx={144+i*10} cy={32} r="6" fill="#999" opacity="0.3">
                <animate attributeName="cy"      values="32;12;-8"       dur={`${2+i*0.4}s`} repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0.08;0"    dur={`${2+i*0.4}s`} repeatCount="indefinite"/>
                <animate attributeName="r"       values="6;12;19"        dur={`${2+i*0.4}s`} repeatCount="indefinite"/>
              </circle>
            ))}
            <rect x="0" y="268" width="300" height="12" fill={gnd}/>
          </svg>
        </div>

        {/* Text */}
        <div style={{ opacity:inView?1:0, transform:inView?'translateX(0)':'translateX(60px)', transition:'all 0.9s 0.3s cubic-bezier(0.23,1,0.32,1)' }}>
          {[
            <>Software Engineer with <strong style={{color:bold}}>2+ years</strong> building scalable fintech and AI-driven systems — from algo-trading platforms to production-grade LLM orchestration engines.</>,
            <>Currently at <strong style={{color:bold}}>Isteer Technology</strong>, designing MCP-powered multi-model AI agents unifying Azure OpenAI, ChatGPT &amp; Gemini seamlessly. Previously at <strong style={{color:bold}}>Vividhity Venture</strong> building SEBI-regulated trading infrastructure.</>,
            <>Strong believer that great systems are built with clarity, curiosity, and craft. Every service I build is designed to survive production.</>,
          ].map((p,i)=>(
            <p key={i} className={s.aboutP} style={{ color:txt }}>{p}</p>
          ))}
          <div className={s.chips}>
            {['📧 sahoodebasis125@gmail.com','📱 8197742883','📍 Bengaluru'].map(t=>(
              <span key={t} className={s.chip}
                style={{ color:isDark?'#fde8a0':'#7a3800', background:isDark?'rgba(61,26,0,0.55)':'rgba(255,220,150,0.65)', borderColor:'#c47a3a' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrap>
  )
}

/* ─────────────────────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────────────────── */
const SKILL_GROUPS = [
  { stall:'🐍 Languages',  items:['Python','JavaScript'] },
  { stall:'⚙️ Backend',    items:['Django','DRF','FastAPI','RESTful APIs','Microservices','Swagger'] },
  { stall:'🤖 AI & LLM',   items:['Azure OpenAI','LLMs','Prompt Engineering','MCP','RAG Systems','HuggingFace','Transformers','Vector DB','NLP'] },
  { stall:'🗄️ Databases',  items:['MySQL','PostgreSQL','SQLite','Redis','Query Optimization'] },
  { stall:'⚡ Async',       items:['Celery','APScheduler','Asyncio','Multi-Threading','Background Jobs'] },
  { stall:'🔐 Security',    items:['JWT','RBAC'] },
  { stall:'☁️ DevOps',     items:['Docker','CI/CD','Linux','Gunicorn','Uvicorn','Nginx','AWS','Azure Boards'] },
  { stall:'🧰 Tools',       items:['Git','GitHub','JIRA','Postman','Agile/Scrum','Numpy','Pandas','React (basics)'] },
]

function SkillCard({ group, index, isDark }) {
  const [ref, inView] = useInView(0.08)
  return (
    <div ref={ref} className={s.skillCard}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.95)',
        transition: `all 0.7s ${index*0.07}s cubic-bezier(0.23,1,0.32,1)`,
        background: isDark ? 'linear-gradient(135deg,#2d1500,#1e0e00)' : 'linear-gradient(135deg,#fff8ee,#fef0d8)',
        border:     `1px solid ${isDark ? '#7a3e10' : '#e0b880'}`,
      }}>
      <div className={s.stallRoof}/>
      <div className={s.stallName} style={{ color: isDark?'#ffd880':'#7a3800' }}>{group.stall}</div>
      <div className={s.skillTags}>
        {group.items.map(item=>(
          <span key={item} className={s.skillTag}
            style={{ color: isDark?'#e5c090':'#5a2e10', background: isDark?'rgba(196,122,58,0.12)':'rgba(196,122,58,0.1)', border:`1px solid ${isDark?'rgba(196,122,58,0.3)':'rgba(196,122,58,0.4)'}` }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  const { isDark } = useTheme()
  return (
    <SectionWrap id="skills" alt>
      <SectionTitle emoji="🏪" title="The Bazaar — Skills" subtitle="Every stall holds a different craft"/>
      <div className={s.skillsGrid}>
        {SKILL_GROUPS.map((g,i)=><SkillCard key={i} group={g} index={i} isDark={isDark}/>)}
      </div>
    </SectionWrap>
  )
}

/* ─────────────────────────────────────────────────────────────
   EXPERIENCE
───────────────────────────────────────────────────────── */
const JOBS = [
  {
    role:    'Associate Software Engineer',
    company: 'Isteer Technology Pvt Ltd',
    period:  '07/2025 – Present',
    loc:     'Bengaluru',
    color:   '#ffd880',
    points: [
      'Built scalable AI backend services using Python and FastAPI for production-grade workloads',
      'Designed & integrated MCP tools enabling seamless communication across Azure OpenAI, ChatGPT, and Gemini',
      'Engineered production-grade prompt templates & LLM optimization strategies improving agent consistency',
      'Implemented AI agent architectures with orchestration and validation layers for context-aware routing',
      'Built RESTful APIs with Redis caching; optimized async HTTPX clients with connection pooling',
    ],
  },
  {
    role:    'Software Engineer',
    company: 'Vividhity Venture Pvt Ltd',
    period:  '03/2024 – 07/2025',
    loc:     'Bengaluru',
    color:   '#c47a3a',
    points: [
      'Built algo trading & investment advisory platforms using Python, Django, and DRF',
      'Implemented SEBI-regulated fintech workflows — advisor/analyst onboarding, RBAC, JWT auth',
      'Designed RESTful APIs and optimized MySQL performance for high-volume financial data',
      'Built real-time trading pipelines via WebSockets and async third-party integrations',
      'Automation pipelines via Celery & APScheduler for strategy execution and portfolio updates',
      'Ensured production reliability through PyTest, structured logging, and root-cause analysis',
    ],
  },
]

function ExperienceCard({ job, index, isDark }) {
  const [ref, inView] = useInView()
  const isLeft = index % 2 === 0

  const dot = (
    <div className={s.timelineDot}
      style={{ background: job.color, borderColor: job.color, boxShadow:`0 0 14px ${job.color}` }}
    />
  )
  const card = (
    <div className={s.timelineCard}
      style={{
        background:     isDark ? 'linear-gradient(135deg,#2d1500,#1e0e00)' : 'linear-gradient(135deg,#fff8ee,#fef0d8)',
        border:         `1px solid ${isDark ? '#5c3010' : '#e0c090'}`,
        borderTopColor: job.color,
      }}>
      <div className={s.jobRole}    style={{ color: job.color }}>{job.role}</div>
      <div className={s.jobCompany} style={{ color: isDark?'#f5d0a0':'#6a3810' }}>{job.company} · {job.loc}</div>
      <div className={s.jobPeriod}  style={{ color: isDark?'#8a5030':'#b07040' }}>{job.period}</div>
      <ul className={s.jobPoints}   style={{ color: isDark?'#c09060':'#7a4820' }}>
        {job.points.map((p,j)=><li key={j}>{p}</li>)}
      </ul>
    </div>
  )

  return (
    <div ref={ref}
      className={`${s.timelineRow} ${isLeft ? s.left : s.right}`}
      style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(48px)', transition:`all 0.85s ${index*0.15}s cubic-bezier(0.23,1,0.32,1)` }}>
      {isLeft ? (
        <>{card}{dot}<div className={s.timelineSpacer}/></>
      ) : (
        <><div className={s.timelineSpacer}/>{dot}{card}</>
      )}
    </div>
  )
}

export function Experience() {
  const { isDark } = useTheme()
  return (
    <SectionWrap id="experience">
      <SectionTitle emoji="🛤️" title="The Road — Experience" subtitle="Milestones carved into stone"/>
      <div className={s.timeline}>
        <div className={s.timelineLine}/>
        {JOBS.map((job,i)=><ExperienceCard key={i} job={job} index={i} isDark={isDark}/>)}
      </div>
    </SectionWrap>
  )
}

/* ─────────────────────────────────────────────────────────────
   EDUCATION
───────────────────────────────────────────────────────── */
const EDU = [
  { icon:'🎓', title:'B.Tech — Computer Science & Engineering', org:'Biju Patnaik University of Technology', period:'2019 – 2023', loc:'Cuttack, India' },
  { icon:'🐍', title:'Python Full Stack Development',           org:'Pyspider Training Institute',            period:'2023 – 2024', loc:'Bengaluru' },
  { icon:'🤖', title:'Certification — GenAI and LLMs',          org:'LinkedIn Learning',                      period:'2024' },
  { icon:'✍️', title:'Certification — Prompt Engineering',      org:'LinkedIn Learning',                      period:'2024' },
]

export function Education() {
  const { isDark } = useTheme()
  const [ref, inView] = useInView()
  return (
    <SectionWrap id="education" alt>
      <SectionTitle emoji="🌳" title="The Banyan Tree — Education" subtitle="Roots that hold everything together"/>
      <div ref={ref} className={s.eduGrid}>
        {EDU.map((e,i)=>(
          <div key={i} className={s.eduCard}
            style={{
              opacity:     inView?1:0,
              transform:   inView?'translateY(0)':'translateY(36px)',
              transition:  `all 0.7s ${i*0.1}s cubic-bezier(0.23,1,0.32,1)`,
              background:  isDark ? 'linear-gradient(135deg,#2d1500,#1e0e00)' : 'linear-gradient(135deg,#fff8ee,#fef0d8)',
              border:      `1px solid ${isDark?'#5c3010':'#e0c090'}`,
              borderTop:   '2px solid #c47a3a',
            }}>
            <div className={s.eduIcon}>{e.icon}</div>
            <div className={s.eduTitle}  style={{ color: isDark?'#ffd880':'#7a3800' }}>{e.title}</div>
            <div className={s.eduOrg}   style={{ color: isDark?'#f5d0a0':'#5a2e10' }}>{e.org}</div>
            <div className={s.eduPeriod} style={{ color: isDark?'#8a5030':'#a06030' }}>{e.period}{e.loc ? ` · ${e.loc}` : ''}</div>
          </div>
        ))}
      </div>
    </SectionWrap>
  )
}

/* ─────────────────────────────────────────────────────────────
   ACHIEVEMENTS
───────────────────────────────────────────────────────── */
const ACHIEVEMENTS = [
  {
    icon:  '🏆',
    label: 'Zero Incidents',
    text:  'Improved production reliability through structured logging, proactive testing, and high code quality — resulting in faster bug resolution and zero critical production incidents.',
  },
  {
    icon:  '🚀',
    label: 'Technical Leadership',
    text:  'Delivered a complex AI integration ahead of schedule while mentoring junior developers and training college students in Python and backend best practices.',
  },
]

export function Achievements() {
  const { isDark } = useTheme()
  const [ref, inView] = useInView()
  return (
    <SectionWrap id="achievements">
      <SectionTitle emoji="🏅" title="The Trophy Shelf — Achievements"/>
      <div ref={ref} className={s.achieveGrid}>
        {ACHIEVEMENTS.map((a,i)=>(
          <div key={i} className={s.achieveCard}
            style={{
              opacity:    inView?1:0,
              transform:  inView?'scale(1)':'scale(0.88)',
              transition: `all 0.8s ${i*0.18}s cubic-bezier(0.23,1,0.32,1)`,
              background: isDark ? 'linear-gradient(135deg,#3d1e00,#2a1200)' : 'linear-gradient(135deg,#fff3de,#ffecc8)',
              border:     `1px solid ${isDark?'#c47a3a':'#e8b060'}`,
            }}>
            <div className={s.achieveIcon}>{a.icon}</div>
            <div className={s.achieveLabel} style={{ color: isDark?'#ffd880':'#7a3800' }}>{a.label}</div>
            <p className={s.achieveText}    style={{ color: isDark?'#e5c090':'#5a2e10' }}>{a.text}</p>
          </div>
        ))}
      </div>
    </SectionWrap>
  )
}

/* ─────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────── */
export function Contact() {
  const { isDark } = useTheme()
  const [ref, inView] = useInView()
  const wood  = isDark ? '#7a4820' : '#c08040'
  const wood2 = isDark ? '#9a6030' : '#d49050'
  const wood3 = isDark ? '#6a3a14' : '#b87030'
  const post  = isDark ? '#5c3010' : '#9a6830'
  const rope  = isDark ? '#8b6040' : '#b89060'

  return (
    <SectionWrap id="contact" alt>
      <SectionTitle emoji="⛲" title="The Village Well — Contact" subtitle="Drop a message, draw some water"/>
      <div ref={ref} className={s.contactWrap} style={{ opacity:inView?1:0, transition:'opacity 0.9s 0.2s' }}>
        {/* Well SVG */}
        <svg viewBox="0 0 200 190" width="180" style={{ margin:'0 auto 40px', display:'block' }}>
          <ellipse cx="100" cy="172" rx="78" ry="14" fill={isDark?'#3d1a00':'#c8a060'} opacity="0.4"/>
          <rect x="32" y="80" width="136" height="84" rx="5" fill={wood}/>
          <ellipse cx="100" cy="80" rx="68" ry="20" fill={wood2}/>
          <ellipse cx="100" cy="80" rx="52" ry="14" fill={wood3}/>
          <rect x="52"  y="16" width="14" height="70" fill={post}/>
          <rect x="134" y="16" width="14" height="70" fill={post}/>
          <path d="M52,16 Q100,-14 148,16" fill="none" stroke={post} strokeWidth="14" strokeLinecap="round"/>
          <line x1="100" y1="4" x2="100" y2="78" stroke={rope} strokeWidth="2" strokeDasharray="5,3"/>
          <rect x="86" y="70" width="28" height="20" rx="3" fill={wood}/>
          <ellipse cx="100" cy="80" rx="48" ry="13" fill="#1a4a7a" opacity="0.3"/>
        </svg>

        <div className={s.contactLinks}>
          {[
            { icon:'📧', label:'sahoodebasis125@gmail.com', href:'mailto:sahoodebasis125@gmail.com' },
            { icon:'📱', label:'8197742883',                href:'tel:+918197742883' },
            { icon:'💼', label:'debasis-sahoo (LinkedIn)',  href:'https://linkedin.com/in/debasis-sahoo' },
            { icon:'📍', label:'Bengaluru, India',          href:null },
          ].map((c,i)=>(
            <a key={i} href={c.href||'#'} className={s.contactLink}
              style={{
                color:       isDark?'#fde8a0':'#7a3800',
                background:  isDark?'rgba(196,122,58,0.12)':'rgba(196,122,58,0.1)',
                border:      `1px solid ${isDark?'#7a4820':'#d4a060'}`,
              }}
              onMouseEnter={e=>{ e.currentTarget.style.background=isDark?'rgba(196,122,58,0.28)':'rgba(196,122,58,0.22)'; e.currentTarget.style.transform='translateY(-3px)' }}
              onMouseLeave={e=>{ e.currentTarget.style.background=isDark?'rgba(196,122,58,0.12)':'rgba(196,122,58,0.1)';  e.currentTarget.style.transform='translateY(0)' }}>
              <span>{c.icon}</span> {c.label}
            </a>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────── */
export function Footer() {
  const { isDark } = useTheme()
  return (
    <footer className={s.footer}
      style={{
        background:  isDark ? '#080200' : '#f5e8c0',
        borderColor: isDark ? 'rgba(196,122,58,0.18)' : 'rgba(196,122,58,0.3)',
      }}>
      <div className={s.footerText} style={{ color: isDark?'#c47a3a':'#9a5020' }}>
        🌾 Crafted with warmth · Debasis Sahoo · Bengaluru
      </div>
      <div className={s.footerSub} style={{ color: isDark?'#3d1a00':'#c49060' }}>
        Every great system starts with a single line of code
      </div>
    </footer>
  )
}
