'use client'

import { useTheme } from '@/hooks/useTheme'
import { FiMoon, FiSun } from 'react-icons/fi'
import styles from './style.module.css'

export const SwitchTheme = ({
  className,
  initialTheme = true,
  nameStorage = 'DarkMode'
}: {
  className?: string;
  initialTheme?: boolean;
  nameStorage?: string;
}) => {
  const { darkMode, setDarkMode } = useTheme(initialTheme, nameStorage)

  const handleClick = () => {
    setDarkMode(!darkMode)
  }

  return (
    <button
      onClick={() => handleClick()}
      aria-label='Switch theme'
      className={`bg-blue-600 dark:bg-amber-400 transition " +
        ${className} ${styles.SwitchDarkmode}`}
    >
      {darkMode ? <FiSun /> : <FiMoon />}
    </button>
  )
}
