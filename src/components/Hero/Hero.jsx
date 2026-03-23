import { useScrollY } from '../../hooks/useParallax'
import { useTheme } from '../../context/ThemeContext'
import s from './Hero.module.css'

const lerp = (a, b, t) => a + (b - a) * Math.min(1, Math.max(0, t))

export default function Hero() {
  const scrollY = useScrollY()
  const { isDark, toggle } = useTheme()
  const progress = Math.min(scrollY / 800, 1)

  const stars   = scrollY * 0.08
  const clouds  = scrollY * 0.25
  const sunMoon = scrollY * 0.18
  const mtn2    = scrollY * 0.32
  const mtn1    = scrollY * 0.42
  const hills   = scrollY * 0.55
  const village = scrollY * 0.68
  const road    = scrollY * 0.78
  const fg      = scrollY * 0.90
  const opacity = Math.max(0, 1 - scrollY / 600)

  const skyTop    = isDark
    ? `hsl(${lerp(20,10,progress)}deg,${lerp(80,90,progress)}%,${lerp(6,14,progress)}%)`
    : `hsl(${lerp(200,210,progress)}deg,${lerp(70,80,progress)}%,${lerp(55,65,progress)}%)`
  const skyMid    = isDark
    ? `hsl(${lerp(25,20,progress)}deg,${lerp(85,92,progress)}%,${lerp(18,30,progress)}%)`
    : `hsl(${lerp(40,50,progress)}deg,${lerp(80,85,progress)}%,${lerp(78,82,progress)}%)`
  const skyBottom = isDark
    ? `hsl(${lerp(32,28,progress)}deg,${lerp(90,95,progress)}%,${lerp(35,50,progress)}%)`
    : `hsl(${lerp(45,48,progress)}deg,${lerp(90,95,progress)}%,${lerp(88,92,progress)}%)`

  const mFill  = isDark ? '#6a2800' : '#a07040'
  const mFill2 = isDark ? '#5c2500' : '#c09060'
  const hFill1 = isDark ? '#4a1e00' : '#8a6030'
  const hFill2 = isDark ? '#5c2800' : '#b08050'
  const house  = isDark ? '#8b5e3c' : '#c49060'
  const roof   = isDark ? '#c47a3a' : '#e8a050'
  const win    = isDark ? '#f5a040' : '#ffd060'
  const door   = isDark ? '#1a0800' : '#7a4820'
  const gnd1   = isDark ? '#2a1000' : '#c8a060'
  const gnd2   = isDark ? '#3d1800' : '#d4b070'
  const treeD  = isDark ? '#2d1500' : '#1a5c10'
  const treeL  = isDark ? '#3d2000' : '#2a7a20'
  const blade  = isDark ? '#7a4820' : '#9a6830'
  const lamp   = isDark ? '#4a2208' : '#7a5030'
  const lampG  = isDark ? '#ffd060' : '#ffaa00'

  return (
    <div className={s.hero} style={{ background:`linear-gradient(180deg,${skyTop} 0%,${skyMid} 50%,${skyBottom} 100%)`, transition:'background 0.8s' }}>

      {/* Stars (dark) */}
      {isDark && (
        <svg className={s.layer} style={{transform:`translateY(${stars}px)`,top:0,opacity:Math.max(0,1-progress*2)}} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
          {[...Array(55)].map((_,i)=>(
            <circle key={i} cx={(i*263+i*i*17)%1440} cy={(i*97+i*31)%320} r={0.6+(i%4)*0.4} fill="white" opacity={0.3+(i%5)*0.12}>
              <animate attributeName="opacity" values={`${0.3+(i%5)*0.12};0.06;${0.3+(i%5)*0.12}`} dur={`${1.8+(i%4)*0.6}s`} repeatCount="indefinite"/>
            </circle>
          ))}
        </svg>
      )}

      {/* Day clouds (light) */}
      {!isDark && (
        <svg className={s.layer} style={{transform:`translateY(${clouds*0.6}px)`,top:'8%',opacity:0.9}} viewBox="0 0 1440 180" preserveAspectRatio="xMidYMid slice">
          {[[60,30,220],[450,20,280],[880,40,200],[1150,25,240]].map(([x,y,w],i)=>(
            <g key={i} transform={`translate(${x},${y})`}>
              <ellipse cx={w/2} cy={48} rx={w/2} ry={24} fill="#fff" opacity="0.85"/>
              <ellipse cx={w*0.35} cy={34} rx={w*0.3} ry={28} fill="#fff" opacity="0.9"/>
              <ellipse cx={w*0.65} cy={36} rx={w*0.27} ry={26} fill="#fff" opacity="0.9"/>
              <ellipse cx={w/2} cy={22} rx={w*0.24} ry={24} fill="#fff"/>
            </g>
          ))}
        </svg>
      )}

      {/* SUN / MOON clickable toggle */}
      <div
        className={s.celestialBtn}
        style={{ top: '5%', transform: `translateY(${sunMoon}px)` }}
        onClick={toggle}
        title={isDark ? 'Switch to Day mode' : 'Switch to Night mode'}
      >
        {isDark ? (
          <svg viewBox="0 0 190 190" width="190" height="190" className={s.celestial}>
            <defs>
              <radialGradient id="sunG"><stop offset="0%" stopColor="#fffde0"/><stop offset="40%" stopColor="#ffd060"/><stop offset="100%" stopColor="#ff7700" stopOpacity="0"/></radialGradient>
            </defs>
            <circle cx="95" cy="95" r="92" fill="url(#sunG)" opacity="0.85"/>
            <circle cx="95" cy="95" r="44" fill="#fff9c0" opacity="0.95"/>
            <circle cx="95" cy="95" r="32" fill="#fffde8"/>
            {[...Array(8)].map((_,i)=>(
              <line key={i}
                x1={95+Math.cos(i*Math.PI/4)*50} y1={95+Math.sin(i*Math.PI/4)*50}
                x2={95+Math.cos(i*Math.PI/4)*74} y2={95+Math.sin(i*Math.PI/4)*74}
                stroke="#ffcc00" strokeWidth="3.5" strokeLinecap="round" opacity="0.75"/>
            ))}
            <text x="95" y="170" textAnchor="middle" fontSize="12" fill={isDark?'#c47a3a':'#7a5020'} fontFamily="Crimson Text,serif" opacity="0.7">☀ click for day</text>
          </svg>
        ) : (
          <svg viewBox="0 0 190 190" width="190" height="190" className={s.celestial}>
            <defs>
              <radialGradient id="moonG"><stop offset="0%" stopColor="#fffde0"/><stop offset="60%" stopColor="#f0e8b0"/><stop offset="100%" stopColor="#d4c060" stopOpacity="0"/></radialGradient>
            </defs>
            <circle cx="95" cy="95" r="88" fill="url(#moonG)" opacity="0.25"/>
            <path d="M95,22 A55,55 0 1,0 142,150 A75,75 0 1,1 95,22Z" fill="#f0e8b0"/>
            <circle cx="78" cy="88" r="9" fill="#d4cc88" opacity="0.45"/>
            <circle cx="112" cy="112" r="6" fill="#d4cc88" opacity="0.35"/>
            <circle cx="100" cy="68" r="4" fill="#d4cc88" opacity="0.3"/>
            <text x="95" y="172" textAnchor="middle" fontSize="12" fill="#5a4a10" fontFamily="Crimson Text,serif" opacity="0.65">🌙 click for night</text>
          </svg>
        )}
      </div>

      {/* Night clouds */}
      {isDark && <>
        <svg className={s.layer} style={{transform:`translateY(${clouds*0.7}px)`,top:'10%',opacity:0.6}} viewBox="0 0 1440 200" preserveAspectRatio="xMidYMid slice">
          {[[60,60,220],[420,40,280],[820,70,200],[1100,45,260],[1280,75,180]].map(([x,y,w],i)=>(
            <g key={i} transform={`translate(${x},${y})`}><ellipse cx={w/2} cy={50} rx={w/2} ry={22} fill="#f5d5a0"/><ellipse cx={w*0.35} cy={36} rx={w*0.28} ry={26} fill="#fce8c0"/><ellipse cx={w*0.65} cy={39} rx={w*0.25} ry={24} fill="#fce8c0"/><ellipse cx={w/2} cy={28} rx={w*0.22} ry={22} fill="#fff5e0"/></g>
          ))}
        </svg>
        <svg className={s.layer} style={{transform:`translateY(${clouds}px)`,top:'18%',opacity:0.45}} viewBox="0 0 1440 160" preserveAspectRatio="xMidYMid slice">
          {[[200,20,160],[650,10,200],[1000,30,140],[1350,15,170]].map(([x,y,w],i)=>(
            <g key={i} transform={`translate(${x},${y})`}><ellipse cx={w/2} cy={44} rx={w/2} ry={18} fill="#f5c880" opacity="0.9"/><ellipse cx={w*0.4} cy={30} rx={w*0.3} ry={24} fill="#fde0a0"/><ellipse cx={w*0.6} cy={32} rx={w*0.28} ry={22} fill="#fde0a0"/><ellipse cx={w/2} cy={20} rx={w*0.2} ry={18} fill="#fff0d0"/></g>
          ))}
        </svg>
      </>}

      {/* Birds */}
      <svg className={s.layer} style={{transform:`translateY(${clouds*0.85}px)`,top:'14%',opacity:isDark?0.7:0.5}} viewBox="0 0 1440 80">
        {[[120,30],[200,15],[290,35],[380,18],[900,25],[970,12],[1050,28]].map(([x,y],i)=>(
          <path key={i} d={`M${x} ${y} Q${x+9} ${y-9} ${x+18} ${y}`} fill="none" stroke={isDark?'#3a1500':'#2a4a18'} strokeWidth="1.8" strokeLinecap="round">
            <animate attributeName="d" values={`M${x} ${y} Q${x+9} ${y-11} ${x+18} ${y};M${x} ${y} Q${x+9} ${y-4} ${x+18} ${y};M${x} ${y} Q${x+9} ${y-11} ${x+18} ${y}`} dur={`${0.7+i*0.13}s`} repeatCount="indefinite"/>
          </path>
        ))}
      </svg>

      {/* Far mountains */}
      <svg className={s.layer} style={{transform:`translateY(${mtn2}px)`,bottom:'26%'}} viewBox="0 0 1440 340" preserveAspectRatio="xMidYMax slice">
        <polygon points="0,340 150,100 300,340" fill={mFill} opacity="0.5"/>
        <polygon points="220,340 430,55 640,340" fill={mFill2} opacity="0.55"/>
        <polygon points="550,340 730,80 910,340" fill={mFill} opacity="0.45"/>
        <polygon points="820,340 1000,70 1180,340" fill={mFill2} opacity="0.5"/>
        <polygon points="1100,340 1250,110 1400,340" fill={mFill} opacity="0.45"/>
      </svg>

      {/* Near mountains */}
      <svg className={s.layer} style={{transform:`translateY(${mtn1}px)`,bottom:'20%'}} viewBox="0 0 1440 280" preserveAspectRatio="xMidYMax slice">
        <path d="M0,280 Q120,140 240,200 Q360,260 480,160 Q600,60 720,180 Q840,300 960,140 Q1080,0 1200,160 Q1320,280 1440,120 L1440,280Z" fill={hFill1} opacity="0.65"/>
      </svg>

      {/* Rolling hills */}
      <svg className={s.layer} style={{transform:`translateY(${hills}px)`,bottom:'12%'}} viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice">
        <path d="M0,220 Q180,80 360,160 Q540,240 720,100 Q900,0 1080,130 Q1260,260 1440,80 L1440,220Z" fill={hFill1} opacity="0.75"/>
        <path d="M0,220 Q200,140 400,180 Q600,220 800,150 Q1000,80 1200,170 Q1320,220 1440,140 L1440,220Z" fill={hFill2} opacity="0.8"/>
      </svg>

      {/* Village silhouette */}
      <svg className={s.layer} style={{transform:`translateY(${village}px)`,bottom:'4%'}} viewBox="0 0 1440 280" preserveAspectRatio="xMidYMax slice">
        <rect x="0" y="220" width="1440" height="60" fill={gnd1}/>
        <path d="M0,220 Q200,205 400,218 Q600,230 800,210 Q1000,192 1200,215 Q1320,225 1440,208 L1440,280 L0,280Z" fill={gnd2}/>
        {[390,840].map((x,i)=>(<g key={i} transform={`translate(${x},78)`}><rect x="18" y="100" width="14" height="110" fill={treeD}/><ellipse cx="25" cy="95" rx="32" ry="44" fill={treeD} opacity="0.9"/><ellipse cx="25" cy="72" rx="24" ry="32" fill={treeL}/><ellipse cx="25" cy="52" rx="18" ry="24" fill={treeL} opacity="0.8"/></g>))}
        <g transform="translate(60,110)"><rect x="0" y="60" width="75" height="90" fill={house}/><polygon points="-8,60 37,0 83,60" fill={roof}/><rect x="24" y="100" width="28" height="50" fill={door}/><rect x="5" y="70" width="20" height="20" fill={win} opacity="0.85"/><rect x="50" y="70" width="20" height="20" fill={win} opacity="0.85"/></g>
        <g transform="translate(220,60)"><rect x="5" y="100" width="110" height="110" fill={house}/><polygon points="-5,100 60,20 125,100" fill={roof}/><polygon points="10,20 60,0 110,20 90,42 30,42" fill={isDark?'#d88838':'#f0a848'}/><rect x="42" y="135" width="36" height="75" fill={door}/><rect x="10" y="115" width="26" height="26" fill={win} opacity="0.9"/><rect x="84" y="115" width="26" height="26" fill={win} opacity="0.9"/></g>
        <g transform="translate(490,75)"><ellipse cx="50" cy="50" rx="44" ry="18" fill={house}/><rect x="8" y="50" width="84" height="44" fill={house} rx="3"/><rect x="10" y="94" width="12" height="100" fill={blade}/><rect x="78" y="94" width="12" height="100" fill={blade}/><rect x="12" y="120" width="76" height="8" fill={roof}/><polygon points="6,50 50,5 94,50" fill={roof}/></g>
        <g transform="translate(650,55)"><rect x="28" y="90" width="24" height="130" fill={house}/><circle cx="40" cy="90" r="9" fill={roof}/><g style={{transformOrigin:'40px 90px',animation:'spin 7s linear infinite'}}><line x1="40" y1="90" x2="40" y2="44" stroke={blade} strokeWidth="5" strokeLinecap="round"/><line x1="40" y1="90" x2="76" y2="100" stroke={blade} strokeWidth="5" strokeLinecap="round"/><line x1="40" y1="90" x2="4" y2="100" stroke={blade} strokeWidth="5" strokeLinecap="round"/></g></g>
        <g transform="translate(760,115)"><rect x="0" y="55" width="80" height="80" fill={house}/><polygon points="-6,55 40,5 86,55" fill={roof}/><rect x="26" y="90" width="28" height="45" fill={door}/><rect x="5" y="65" width="20" height="20" fill={win} opacity="0.75"/><rect x="55" y="65" width="20" height="20" fill={win} opacity="0.75"/></g>
        <g transform="translate(1020,80)"><rect x="0" y="80" width="130" height="110" fill={house}/><polygon points="-10,80 65,10 140,80" fill={roof}/><rect x="48" y="115" width="34" height="75" fill={door}/><rect x="8" y="95" width="30" height="30" fill={win} opacity="0.9"/><rect x="92" y="95" width="30" height="30" fill={win} opacity="0.9"/><rect x="55" y="18" width="20" height="22" fill={isDark?'#ffd700':'#e8b000'} opacity="0.8"/><rect x="52" y="5" width="6" height="15" fill={blade}/></g>
        <g transform="translate(1220,120)"><rect x="0" y="55" width="70" height="75" fill={house}/><polygon points="-6,55 35,5 76,55" fill={roof}/><rect x="22" y="90" width="26" height="40" fill={door}/><rect x="4" y="65" width="18" height="18" fill={win} opacity="0.7"/><rect x="48" y="65" width="18" height="18" fill={win} opacity="0.7"/></g>
        {[180,460,720,980,1180,1360].map((x,i)=>(<g key={i} transform={`translate(${x},130)`}><rect x="4" y="0" width="5" height="90" fill={lamp}/><circle cx="6" cy="2" r="8" fill={lampG} opacity="0.9"><animate attributeName="opacity" values="0.9;0.5;0.9" dur={`${2.5+i*0.3}s`} repeatCount="indefinite"/></circle><circle cx="6" cy="2" r="18" fill={lampG} opacity="0.12"><animate attributeName="opacity" values="0.12;0.04;0.12" dur={`${2.5+i*0.3}s`} repeatCount="indefinite"/></circle></g>))}
      </svg>

      {/* Foreground grass */}
      <svg className={s.layer} style={{transform:`translateY(${fg}px)`,bottom:-10}} viewBox="0 0 1440 80" preserveAspectRatio="xMidYMax slice">
        <path d="M0,80 Q200,40 400,65 Q600,80 800,45 Q1000,10 1200,55 Q1350,80 1440,40 L1440,80Z" fill={gnd1}/>
        {[...Array(30)].map((_,i)=>(<path key={i} d={`M${(i*53)%1440},80 Q${(i*53)%1440+4},${58+i%12} ${(i*53)%1440+8},80`} fill="none" stroke={isDark?'#4a2800':'#4a8a20'} strokeWidth="2"/>))}
      </svg>

      {/* Hero text */}
      <div className={s.heroText} style={{opacity}}>
        <p className={s.heroSub} style={{color:isDark?'#f5c880':'#a05520'}}>Welcome to the village of</p>
        <h1 className={s.heroName} style={{color:isDark?'#ffd880':'#7a3800',textShadow:isDark?'0 0 80px #ff8800,0 4px 24px #1a0800':'0 0 40px #ffaa0060,0 2px 8px #3a1800'}}>
          Debasis Sahoo
        </h1>
        <p className={s.heroRole} style={{color:isDark?'#f5c070':'#a05520'}}>Software Engineer · Backend & AI Platforms</p>
        <div className={s.heroBadges}>
          {['Bengaluru','Python','GenAI','MCP','2+ yrs'].map(t=>(
            <span key={t} className={s.badge} style={{background:isDark?'rgba(61,26,0,0.6)':'rgba(255,220,150,0.7)',borderColor:'#c47a3a',color:isDark?'#fde8a0':'#7a3800'}}>{t}</span>
          ))}
        </div>
        <div className={s.scrollHint} style={{color:isDark?'#c47a3a':'#a05520'}}>
          <span>Scroll to enter the village</span>
          <div className={s.scrollArrow} style={{color:isDark?'#ffd880':'#c47a3a'}}>↓</div>
        </div>
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
