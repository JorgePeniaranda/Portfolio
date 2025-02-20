import type { NavbarSection } from '../../../../types/navbar';

import { motion, useMotionValue } from 'framer-motion';
import { Loader, Moon, Sun, Volume2, VolumeX, icons } from 'lucide-react';
import { Fragment } from 'react';

import { DesktopNavbarItem } from './item';
import { DesktopNavbarSeparator } from './separator';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSoundStore } from '@/services/storage/sound';
import { useThemeStore } from '@/services/storage/theme';

/**
 * Desktop navigation bar component.
 * @param params - Component properties
 * @param params.items - List of navigation sections and links
 * @returns A desktop navigation bar
 */
export function DesktopNavbar({ items }: { items: NavbarSection[] }) {
  const { theme, toggleTheme } = useThemeStore();
  const { isSoundEnabled, toggleSound } = useSoundStore();

  // Motion value for mouse position (used for hover effect).
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      aria-label='Main navigation'
      className='fixed bottom-6 left-1/2 z-50 hidden h-14 -translate-x-1/2 items-center justify-evenly space-x-3 rounded-3xl bg-neutral-50/90 p-3 ring-1 ring-neutral-300 backdrop-blur-2xl transition dark:bg-neutral-950/50 dark:ring-neutral-700 md:flex'
      // Reset mouseX on mouse leave
      onMouseLeave={() => mouseX.set(Infinity)}
      // Update mouseX on mouse move for hover effect
      onMouseMove={(e) => mouseX.set(e.pageX)}
    >
      {/* Render navigation links */}
      {items.map((section, sectionIndex) => (
        <Fragment key={crypto.randomUUID()}>
          <ul aria-label='Link List' className='flex items-center justify-center space-x-3'>
            {section.items.map(({ label, link, icon, ...props }) => {
              // Dynamically load the icon based on the icon string
              const Icon = icons[icon];

              return (
                <DesktopNavbarItem key={crypto.randomUUID()} mouseX={mouseX}>
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <a
                          aria-label={label}
                          className='grid size-full place-items-center rounded-full'
                          href={link}
                          {...props}
                        >
                          <Icon
                            aria-label={`${label} Icon`}
                            className='size-3/5 text-neutral-500 transition dark:text-neutral-300'
                          />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>{label}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DesktopNavbarItem>
              );
            })}
          </ul>
          {sectionIndex < items.length - 1 && <DesktopNavbarSeparator />}
        </Fragment>
      ))}
      {items.length > 0 && <DesktopNavbarSeparator />}

      {/* Render navigation buttons (theme and sound toggle) */}
      <ul
        aria-label='Site Configuration Buttons'
        className='flex items-center justify-center space-x-3'
      >
        <DesktopNavbarItem mouseX={mouseX}>
          <button
            aria-label='Toggle theme'
            className='grid size-full place-items-center rounded-full'
            type='button'
            onClick={toggleTheme}
          >
            {theme === 'light' && (
              <Sun
                aria-label='light'
                className='size-3/5 text-neutral-500 transition dark:text-neutral-300'
              />
            )}
            {theme === 'dark' && (
              <Moon
                aria-label='dark'
                className='size-3/5 text-neutral-500 transition dark:text-neutral-300'
              />
            )}
            {theme !== 'dark' && theme !== 'light' && (
              <Loader
                aria-label='dark'
                className='size-3/5 animate-spin text-neutral-500 transition dark:text-neutral-300'
              />
            )}
            <span className='sr-only'>
              Current:
              <b>
                {theme === 'light' && 'Light'}
                {theme === 'dark' && 'Dark'}
                {theme !== 'dark' && theme !== 'light' && 'Loading'}
              </b>
            </span>
          </button>
        </DesktopNavbarItem>
        <DesktopNavbarItem mouseX={mouseX}>
          <button
            aria-label='Toggle sound'
            className='grid size-full place-items-center rounded-full'
            type='button'
            onClick={toggleSound}
          >
            {isSoundEnabled ? (
              <Volume2
                aria-label='system'
                className='size-3/5 text-neutral-500 transition dark:text-neutral-300'
              />
            ) : (
              <VolumeX
                aria-label='system'
                className='size-3/5 text-neutral-500 transition dark:text-neutral-300'
              />
            )}
            <span className='sr-only'>
              Current:
              <b>{isSoundEnabled ? 'Sound On' : 'Sound Off'}</b>
            </span>
          </button>
        </DesktopNavbarItem>
      </ul>
    </motion.nav>
  );
}
