import Link from 'next/link'
import { SiGithub, SiLinktree, SiLinkedin } from 'react-icons/si'

export const Footer = () => {
  return (
    <footer className='w-full h-[40vh] flex flex-col justify-around items-center border-t-2 border-zinc-600 dark:border-zinc-800 pt-7'>
      <ul className='flex justify-around items-center w-1/2 text-4xl'>
        <li>
          <Link
            href='https://github.com/jorgepeniaranda'
            aria-label='Github link'
            target='_blank'
            rel='noreferrer'
          >
            <SiGithub className='hover:scale-125' />
          </Link>
        </li>
        <li>
          <Link
            href='https://linktr.ee/jorgepeniaranda'
            aria-label='Linktree link'
            target='_blank'
            rel='noreferrer'
          >
            <SiLinktree className='hover:scale-125' />
          </Link>
        </li>
        <li>
          <Link
            href='https://www.linkedin.com/in/JorgePeniaranda/'
            aria-label='LinkedIn link'
            target='_blank'
            rel='noreferrer'
          >
            <SiLinkedin className='hover:scale-125' />
          </Link>
        </li>
      </ul>
      <address className='not-italic'>
        Power by{' '}
        <Link
          href='mailto:contact@jorgepeniaranda.me'
          className='underline underline-offset-2 hover:brightness-75'
        >
          Jorge Peñaranda
        </Link>
      </address>
    </footer>
  )
}
