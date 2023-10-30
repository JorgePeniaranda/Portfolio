import { SwitchTheme } from '@/components/SwitchTheme'
import { Header, About, Skills, Projects, Contact } from './sections'
import { GoUpButton } from '@/components/GoUpButton'

export const HomePage = () => {
  return (
    <main className='w-full'>
      <Header />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <div id='fixed'>
        <SwitchTheme initialTheme nameStorage='DarkMode-Home' />
        <GoUpButton />
      </div>
    </main>
  )
}
