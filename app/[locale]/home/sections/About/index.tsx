import Link from 'next/link'
import { ReadingTime } from '@/public/svg'
import { useTranslations } from 'next-intl'

export default function About () {
  const t = useTranslations('About')

  return (
    <section className='w-full flex flex-wrap-reverse items-center justify-center pt-20 pb-48'>
      <figure className='w-[90%] mt-16 sm:mt-0 md:w-[55%]'>
        <ReadingTime className='mt-16 w-full sm:w-3/4 md:mt-0' />
        <figcaption className='text-center hidden'>{t('figure')}</figcaption>
      </figure>
      <article className='flex flex-col items-center text-center md:items-start md:text-start w-[90%] sm:w-[45%]'>
        <h2 className='text-5xl select-none font-bold underline underline-offset-4'>
          {t('title')}
        </h2>
        <p className='mt-2 tracking-wider text-lg'>{t('text')}</p>
        <Link
          href='https://dev.to/jorgepeniaranda'
          target='_blank'
          rel='noreferrer'
          className='mt-5 w-fit p-2 px-6 select-none text-center font-semibold rounded-md bg-primary-dark text-secondary-dark dark:bg-primary dark:text-secondary hover:brightness-75'
        >
          {t('button')}
        </Link>
      </article>
    </section>
  )
}
