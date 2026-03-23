import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import VillageMap from './components/VillageMap/VillageMap'
import { About, Skills, Experience, Education, Contact, Achievements, Footer } from './components/sections/Sections'
import ProjectPage from './components/ProjectPage/ProjectPage'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <VillageMap />
      <Education />
      <Achievements />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
      </Routes>
    </ThemeProvider>
  )
}
