import { NotFound } from '@/public/svg'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Loading () {
  const t = useTranslations('NotFound')

  return (
    <Link href='/' className='flex flex-col items-center justify-evenly mx-auto w-fit h-[calc(100vh_-_9rem)] hover:scale-110 transition-all ease-linear'>
      <NotFound className='h-3/4' />
      <p className='text-3xl font-bold'>{t('404')}</p>
    </Link>
  )
}
