import { Header, About, Skills, Projects, Contact } from './sections'

export const HomePage = () => {
  return (
    <main className='w-full'>
      <Header />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}
