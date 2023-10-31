'use client'

import { useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import styles from './style.module.css'
import { MdOutlineDoneAll, MdError } from 'react-icons/md'

export const ContactForm = ({
  namePlaceHolder,
  emailPlaceHolder,
  messagePlaceHolder,
  sendPlaceHolder,
  className
}: {
  namePlaceHolder: string;
  emailPlaceHolder: string;
  messagePlaceHolder: string;
  sendPlaceHolder: string;
  className?: string;
}) => {
  const [done, setDone] = useState(false)
  const [error, setError] = useState(false)

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!done && !error) {
      emailjs
        .sendForm(
          'service_v055els',
          'template_jlv215d',
          e.currentTarget,
          '5N89hdd9Q-Tpjh0fF'
        )
        .then(
          (result) => {
            setDone(true);
            (e.target as HTMLFormElement)
              .getElementsByTagName('button')[0]
              .classList.add(styles.buttonSuccess)
          },
          (error) => {
            setError(true);
            (e.target as HTMLFormElement)
              .getElementsByTagName('button')[0]
              .classList.add(styles.buttonError)
            console.log(error)
          }
        )
    }
  }
  return (
    <form onSubmit={sendEmail} className={styles.formStyle + ' ' + className}>
      <input
        type='text'
        name='name'
        placeholder={`${namePlaceHolder}...`}
        className='border-secondary-dark dark:border-secondary text-gray-color focus:text-secondary dark:focus:text-secondary-dark focus:placeholder:text-secondary dark:focus:placeholder:text-secondary-dark'
        autoComplete='name'
        required
      />
      <input
        type='email'
        name='email'
        placeholder={`${emailPlaceHolder}...`}
        className='border-secondary-dark dark:border-secondary text-gray-color focus:text-secondary dark:focus:text-secondary-dark focus:placeholder:text-secondary dark:focus:placeholder:text-secondary-dark'
        autoComplete='email'
        required
      />
      <textarea
        name='message'
        cols={30}
        rows={6}
        placeholder={`${messagePlaceHolder}...`}
        className='border-secondary-dark dark:border-secondary text-gray-color focus:text-secondary dark:focus:text-secondary-dark focus:placeholder:text-secondary dark:focus:placeholder:text-secondary-dark'
        autoComplete='off'
        required
      />
      <button
        type='submit'
        className='bg-primary-dark select-none text-secondary-dark dark:bg-primary dark:text-secondary '
      >
        {done
          ? (
            <MdOutlineDoneAll />
            )
          : undefined || error
            ? (
              <MdError />
              )
            : (
                undefined || sendPlaceHolder
              )}
      </button>
    </form>
  )
}
