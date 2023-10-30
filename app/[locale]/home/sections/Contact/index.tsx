import { ContactForm } from '@/components/ContactForm'
import { Nature } from '@/public/svg'
import { useTranslations } from 'next-intl'

export default function Contact () {
  const t = useTranslations('Contact')

  return (
    <section className='flex flex-wrap-reverse justify-around pt-36 pb-32 items-center'>
      <figure className='flex items-center pb-16 mt-16 justify-center w-[90%] md:w-[55%] md:mt-0'>
        <figcaption className='text-center hidden'>{t('figure')}</figcaption>
        <Nature className='w-full md:w-4/6 pr-0 md:pr-10' />
      </figure>
      <article className='flex flex-col items-center text-center w-[90%] md:w-[45%] md:items-start md:text-start'>
        <h2 className='text-5xl font-bold select-none underline underline-offset-4'>
          {t('title')}
        </h2>
        <p className='mt-2 tracking-wider text-xl'>{t('text')}</p>
        <ContactForm
          namePlaceHolder={t('Name-placeholder')}
          emailPlaceHolder={t('Email-placeholder')}
          messagePlaceHolder={t('Message-placeholder')}
          sendPlaceHolder={t('Send-placeholder')}
        />
      </article>
    </section>
  )
}
