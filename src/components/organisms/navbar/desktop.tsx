import type { INavbarSection } from './navbar'

import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from 'framer-motion'
import { Loader, Moon, Sun, Volume2, VolumeX, icons } from 'lucide-react'
import { Fragment, useRef } from 'react'

import { NavbarAnimationConfig } from '../../../constants/styles'
import useSound from '../../../hooks/useSound'
import useTheme from '../../../hooks/useTheme'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../../ui/tooltip'

//#region NAVBAR
export function DesktopNavbar({ items }: { items: INavbarSection[] }) {
  const { theme, toggleTheme } = useTheme()
  const { sound, toggleSound } = useSound()
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.nav
      aria-label="Main navigation"
      className="fixed bottom-6 left-1/2 z-50 hidden h-14 -translate-x-1/2 items-center justify-evenly space-x-3 rounded-3xl bg-neutral-50/90 p-3 ring-1 ring-neutral-300 backdrop-blur-2xl transition dark:bg-neutral-950/50 dark:ring-neutral-700 md:flex"
      onMouseLeave={() => mouseX.set(Infinity)}
      onMouseMove={e => mouseX.set(e.pageX)}
    >
      {/* ========= NAVEGATION LINKS ITEMS =========   */}
      {items.map((section, sectionIndex) => (
        <Fragment key={crypto.randomUUID()}>
          <ul
            aria-label="Link List"
            className="flex items-center justify-center space-x-3"
          >
            {section.items.map(({ label, link, icon, ...props }) => {
              const Icon = icons[icon]

              return (
                <NavbarItem key={crypto.randomUUID()} mouseX={mouseX}>
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <a
                          aria-label={label}
                          className="grid size-full place-items-center rounded-full"
                          href={link}
                          {...props}
                        >
                          <Icon
                            aria-label={`${label} Icon`}
                            className="size-3/5 text-neutral-500 transition dark:text-neutral-300"
                          />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>{label}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </NavbarItem>
              )
            })}
          </ul>
          {sectionIndex < items.length - 1 && <NavbarSeparator />}
        </Fragment>
      ))}
      {items.length > 0 && <NavbarSeparator />}

      {/* ========= NAVEGATION BUTTONS ITEMS =========   */}
      <ul
        aria-label="Site Configuration Buttons"
        className="flex items-center justify-center space-x-3"
      >
        <NavbarItem mouseX={mouseX}>
          <button
            aria-label="Toggle theme"
            className="grid size-full place-items-center rounded-full"
            type="button"
            onClick={toggleTheme}
          >
            {theme === 'light' && (
              <Sun
                aria-label="light"
                className="size-3/5 text-neutral-500 transition dark:text-neutral-300"
              />
            )}
            {theme === 'dark' && (
              <Moon
                aria-label="dark"
                className="size-3/5 text-neutral-500 transition dark:text-neutral-300"
              />
            )}
            {theme !== 'dark' && theme !== 'light' && (
              <Loader
                aria-label="dark"
                className="size-3/5 animate-spin text-neutral-500 transition dark:text-neutral-300"
              />
            )}
            <span className="sr-only">
              Current:
              <b>
                {theme === 'light' && 'Light'}
                {theme === 'dark' && 'Dark'}
                {theme !== 'dark' && theme !== 'light' && 'Loading'}
              </b>
            </span>
          </button>
        </NavbarItem>
        <NavbarItem mouseX={mouseX}>
          <button
            aria-label="Toggle sound"
            className="grid size-full place-items-center rounded-full"
            type="button"
            onClick={toggleSound}
          >
            {sound ? (
              <Volume2
                aria-label="system"
                className="size-3/5 text-neutral-500 transition dark:text-neutral-300"
              />
            ) : (
              <VolumeX
                aria-label="system"
                className="size-3/5 text-neutral-500 transition dark:text-neutral-300"
              />
            )}
            <span className="sr-only">
              Current:
              <b>{sound ? 'Sound On' : 'Sound Off'}</b>
            </span>
          </button>
        </NavbarItem>
      </ul>
    </motion.nav>
  )
}
//#endregion

//#region NAVBAR ITEM
function NavbarItem({
  mouseX,
  children
}: {
  mouseX: MotionValue<number>
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLLIElement>(null)

  const distance = useTransform(mouseX, val => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(
    distance,
    NavbarAnimationConfig.transform.inputRange,
    NavbarAnimationConfig.transform.outputRange
  )
  const width = useSpring(widthSync, NavbarAnimationConfig.spring)

  return (
    <motion.li
      ref={ref}
      aria-label="Navigation Item"
      className="flex aspect-square items-center justify-center rounded-full border border-neutral-100 bg-neutral-100 text-center transition dark:border-neutral-700 dark:bg-neutral-900/80"
      style={{ width }}
    >
      {children}
    </motion.li>
  )
}
//#endregion

//#region NAVBAR SEPARATOR
function NavbarSeparator() {
  return <hr className="h-8 w-0.5 bg-neutral-400/20 dark:bg-neutral-600/20" />
}
//#endregion
