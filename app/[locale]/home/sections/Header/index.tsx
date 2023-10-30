import styles from './style.module.css'
import { Rocket } from '@/public/svg'
import { useTranslations } from 'next-intl'

export default function Header () {
  const t = useTranslations('Header')

  return (
    <header className='w-full min-h-[calc(100vh_-_9rem)] flex flex-wrap justify-around select-none gap-16 sm:gap-0'>
      {/* h-[calc(100%_-_7.5rem)]: 100% - nav size */}
      <div className='flex flex-col justify-evenly text-center md:text-start w-[90%] md:w-[70%]'>
        <p className='font-bold text-5xl sm:text-7xl'>
          {t('title')}{' '}
          <strong
            className={'font-bold text-5xl sm:text-7xl ' + styles.specialWord}
          >
            {t('title-special')}
          </strong>
        </p>
        <h1 className='text-zinc-400  font-semibold text-xl select-text'>
          Jorge Peñaranda / {t('category')}
        </h1>
      </div>
      <figure className='flex items-center justify-center pb-32 w-[90%] sm:w-[30%]'>
        <Rocket
          className='w-full h-full fill-red-950'
          className_DynamicBG={styles.specialSVG}
        />
        <figcaption className='text-center hidden'>{t('figure')}</figcaption>
      </figure>
    </header>
  )
}
