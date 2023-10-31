import { GoUpButton } from '@/components/GoUpButton'
import { ProjectCard } from '@/components/ProjectCard'
import { SwitchTheme } from '@/components/SwitchTheme'
import { fetchData } from '@/services/projectsService'
import { AiFillFolderOpen } from 'react-icons/ai'

export default function Portafolio () {
  return (
    <div className='flex pb-16 flex-wrap'>
      <header className='w-full h-40 my-3 bg-black mb-9 px-16 flex justify-between items-center text-white select-none'>
        <h1 className='font-bold text-6xl'>Proyectos</h1>
        <AiFillFolderOpen className='text-6xl' />
      </header>
      <aside className='flex-1 px-10 py-4 mr-10 border-r-2 border-black text-xl'>
        <ul className='flex flex-col gap-2'>
          <li>
            - Categoria
            <ul className='ml-5'>
              <li>+ Subcategoria</li>
              <li>+ Subcategoria</li>
            </ul>
          </li>
          <li>+ Categoria</li>
          <li>+ Categoria</li>
          <li>+ Categoria</li>
        </ul>
      </aside>
      <main className='flex-[6_1]'>
        <section className='flex flex-wrap gap-5'>
          {fetchData().map(([projectCode, data]) => (
            <ProjectCard key={projectCode} ProjectInfo={data} />
          ))}
        </section>
      </main>
    </div>
  )
}
