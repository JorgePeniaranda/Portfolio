'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiChevronDown } from 'react-icons/fi'
import styles from './style.module.css'
import { lenguagesSupported } from '@/consts'

export const SwitchLenguage = ({ lng }: { lng: string }) => {
  const path = usePathname()
  const pathWithoutLng = path.split(`/${lng}`)

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        {lng}
        <FiChevronDown />
      </button>
      <div className={styles.dropdown_content}>
        {lenguagesSupported
          .filter((l) => lng !== l)
          .map((l: string) => {
            return (
              <Link
                key={l}
                href={`/${l}/${
                  pathWithoutLng.length > 1 ? pathWithoutLng[1] : ''
                }`}
              >
                {l}
              </Link>
            )
          })}
      </div>
    </div>
  )
}
