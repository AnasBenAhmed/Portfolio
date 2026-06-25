import PageTransition from '@/components/ui/PageTransition'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </PageTransition>
  )
}
