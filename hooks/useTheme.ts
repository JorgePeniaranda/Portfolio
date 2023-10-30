import { useState, useEffect } from 'react'

export const useTheme = (initialValue: boolean, nameStorage: string) => {
  const [darkMode, setDarkMode] = useState(initialValue)

  const ChangeTheme = (newValue: boolean) => {
    setDarkMode(newValue)
    localStorage.setItem(nameStorage, newValue.toString())
  }

  useEffect(() => {
    if (!localStorage.getItem(nameStorage)) { localStorage.setItem(nameStorage, initialValue.toString()) } else { setDarkMode(localStorage.getItem(nameStorage) === 'true') }
  }, [nameStorage, initialValue])

  useEffect(() => {
    if (!darkMode) document.documentElement.classList.remove('dark')
    else document.documentElement.classList.add('dark')
  }, [darkMode])

  return { darkMode, setDarkMode: ChangeTheme }
}
