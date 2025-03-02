import type { NavbarSection } from '../../../types/navbar';

import { Loader, Moon, Settings, Sun, Volume2, VolumeX, icons } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from '@/hooks/use-translations';
import { useSoundStore } from '@/services/storage/sound';
import { useThemeStore } from '@/services/storage/theme';

/**
 * MobileNavbar component renders a responsive navigation bar for mobile devices.
 * It displays navigation links, configuration buttons, and allows toggling of theme and sound.
 * @param params - Function parameters
 * @param params.items - List of items to render
 * @returns A React component
 */
export function MobileNavbar({ items }: { items: NavbarSection[] }) {
  const { theme, toggleTheme } = useThemeStore();
  const { isSoundEnabled, toggleSound } = useSoundStore();
  const { t } = useTranslations();

  return (
    <nav
      aria-label={t('components.mobile-navbar.aria-label.main')}
      className='fixed bottom-0 z-50 flex h-16 w-full items-center justify-around space-x-3 bg-neutral-100 p-4 ring-1 ring-neutral-300 md:hidden dark:bg-neutral-900 dark:ring-neutral-700'
    >
      {/* ========= NAVEGATION LINKS ITEMS =========   */}
      {items.map((section) => {
        const SectionIcon = icons[section.icon];

        return (
          <DropdownMenu key={crypto.randomUUID()}>
            <DropdownMenuTrigger aria-label={section.label}>
              <SectionIcon className='mr-2 size-6' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel asChild>
                <span>{section.label}</span>
              </DropdownMenuLabel>
              {section.items.map(({ label, link, icon, ...props }) => {
                const ItemIcon = icons[icon];

                return (
                  <DropdownMenuItem key={crypto.randomUUID()} asChild>
                    <a href={link} {...props}>
                      <ItemIcon className='mr-2 size-4' />
                      <span>{label}</span>
                    </a>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}

      {/* ========= NAVEGATION BUTTONS ITEMS =========   */}
      <DropdownMenu key={crypto.randomUUID()}>
        <DropdownMenuTrigger aria-label={t('components.mobile-navbar.aria-label.site-config')}>
          <Settings className='mr-2 size-6' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel asChild>
            <span>{t('components.mobile-navbar.config-title')}</span>
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <button
              aria-label={t('components.mobile-navbar.aria-label.toggle-theme')}
              className='size-full'
              type='button'
              onClick={toggleTheme}
            >
              {theme === 'light' && (
                <Sun
                  aria-label={t('components.mobile-navbar.aria-label.theme-icon')}
                  className='mr-2 size-4 text-neutral-500 transition dark:text-neutral-300'
                />
              )}
              {theme === 'dark' && (
                <Moon
                  aria-label={t('components.mobile-navbar.aria-label.theme-icon')}
                  className='mr-2 size-4 text-neutral-500 transition dark:text-neutral-300'
                />
              )}
              {theme !== 'dark' && theme !== 'light' && (
                <Loader
                  aria-label={t('components.mobile-navbar.aria-label.theme-icon')}
                  className='mr-2 size-4 animate-spin text-neutral-500 transition dark:text-neutral-300'
                />
              )}
              <span>
                {theme === 'light' && t('components.mobile-navbar.theme.light')}
                {theme === 'dark' && t('components.mobile-navbar.theme.dark')}
                {theme !== 'dark' &&
                  theme !== 'light' &&
                  t('components.mobile-navbar.theme.loading')}
              </span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              aria-label={t('components.mobile-navbar.aria-label.toggle-sound')}
              className='size-full'
              type='button'
              onClick={toggleSound}
            >
              {isSoundEnabled ? (
                <Volume2
                  aria-label={t('components.mobile-navbar.aria-label.sound-icon')}
                  className='mr-2 size-4 text-neutral-500 transition dark:text-neutral-300'
                />
              ) : (
                <VolumeX
                  aria-label={t('components.mobile-navbar.aria-label.sound-icon')}
                  className='mr-2 size-4 text-neutral-500 transition dark:text-neutral-300'
                />
              )}
              <span>
                {isSoundEnabled
                  ? t('components.mobile-navbar.sound.on')
                  : t('components.mobile-navbar.sound.off')}
              </span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
