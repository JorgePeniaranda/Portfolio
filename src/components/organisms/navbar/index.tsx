import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from 'framer-motion'
import { Loader, Moon, Sun, Volume2, VolumeX, icons } from 'lucide-react'
import { Fragment, useRef } from 'react'

import useSound from '../../../hooks/useSound'
import useTheme from '../../../hooks/useTheme'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../../ui/tooltip'

//#region TYPES
export interface INavbarLink
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  icon: keyof typeof icons
  label: string
  link: string
}
//#endregion

//#region NAVBAR
export function Navbar({ items }: { items: INavbarLink[][] }) {
  const { theme, toggleTheme } = useTheme()
  const { sound, toggleSound } = useSound()
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 z-50 flex h-14 -translate-x-1/2 items-center justify-evenly space-x-3 rounded-3xl bg-neutral-50/90 p-3 ring-1 ring-neutral-300 backdrop-blur-2xl transition dark:bg-neutral-950/50 dark:ring-neutral-700"
      onMouseLeave={() => mouseX.set(Infinity)}
      onMouseMove={e => mouseX.set(e.pageX)}
      aria-label="Main navigation"
    >
      {/* ========= NAVEGATION LINKS ITEMS =========   */}
      {items.map((section, sectionIndex) => (
        <Fragment key={crypto.randomUUID()}>
          <ul
            className="flex items-center justify-center space-x-3"
            aria-label="Link List"
          >
            {section.map(({ label, link, icon, ...props }, itemIndex) => {
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
                          accessKey={label[0].toLowerCase()}
                          {...props}
                        >
                          <Icon
                            className="size-3/5 text-neutral-500 transition dark:text-neutral-300"
                            aria-label={`${label} Icon`}
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
        className="flex items-center justify-center space-x-3"
        aria-label="Site Configuration Buttons"
      >
        <NavbarItem mouseX={mouseX}>
          <button
            className="grid size-full place-items-center rounded-full"
            type="button"
            onClick={toggleTheme}
            accessKey="t"
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
            <span className="sr-only">Toggle theme</span>
          </button>
        </NavbarItem>
        <NavbarItem mouseX={mouseX}>
          <button
            className="grid size-full place-items-center rounded-full"
            type="button"
            onClick={toggleSound}
            accessKey="m"
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
            <span className="sr-only">Toggle theme</span>
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
  const ref = useRef()

  const distance = useTransform(mouseX, val => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.li
      ref={ref}
      className="flex aspect-square items-center justify-center rounded-full border border-neutral-100 bg-neutral-100 text-center transition dark:border-neutral-700 dark:bg-neutral-900/80"
      style={{ width }}
      aria-label="Navigation Item"
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
