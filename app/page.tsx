import Intro from "@/components/intro"
import About from '@/components/about'
import Projects from '@/components/projects'
import Skills from '@/components/skills'
import Experience from '@/components/experience'
import Contact from '@/components/contact'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <main>
      <Intro/>
      <div className="flex flex-col items-center px-4">
        <About/>
        <Projects/>
        <Skills/>
        <Experience/>

        <Contact/>
        <Toaster/>
      </div>
    </main>
  )
}
