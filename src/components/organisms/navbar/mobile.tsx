import type {INavbarSection} from "./navbar";

import {Loader, Moon, Settings, Sun, Volume2, VolumeX, icons} from "lucide-react";

import useSound from "../../../hooks/useSound";
import useTheme from "../../../hooks/useTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

export function MobileNavbar({items}: {items: INavbarSection[]}) {
  const {theme, toggleTheme} = useTheme();
  const {sound, toggleSound} = useSound();

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-around space-x-3 bg-neutral-100 p-4 ring-1 ring-neutral-300 dark:bg-neutral-900 dark:ring-neutral-700 md:hidden"
    >
      {/* ========= NAVEGATION LINKS ITEMS =========   */}
      {items.map((section) => {
        const SectionIcon = icons[section.icon];

        return (
          <DropdownMenu key={crypto.randomUUID()}>
            <DropdownMenuTrigger aria-label={section.label}>
              <SectionIcon className="mr-2 size-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel asChild>
                <span>{section.label}</span>
              </DropdownMenuLabel>
              {section.items.map(({label, link, icon, ...props}) => {
                const ItemIcon = icons[icon];

                return (
                  <DropdownMenuItem key={crypto.randomUUID()} asChild>
                    <a href={link} {...props}>
                      <ItemIcon className="mr-2 size-4" />
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
        <DropdownMenuTrigger aria-label="Site Configurations">
          <Settings className="mr-2 size-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel asChild>
            <span>Configuraciones</span>
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <button
              aria-label="Toggle theme"
              className="size-full"
              type="button"
              onClick={toggleTheme}
            >
              {theme === "light" && (
                <Sun
                  aria-label="light"
                  className="mr-2 size-4 text-neutral-500 transition dark:text-neutral-300"
                />
              )}
              {theme === "dark" && (
                <Moon
                  aria-label="dark"
                  className="mr-2 size-4 text-neutral-500 transition dark:text-neutral-300"
                />
              )}
              {theme !== "dark" && theme !== "light" && (
                <Loader
                  aria-label="loading"
                  className="mr-2 size-4 animate-spin text-neutral-500 transition dark:text-neutral-300"
                />
              )}
              <span>
                {theme === "light" && "Activar Modo Oscuro"}
                {theme === "dark" && "Activar Modo Claro"}
                {theme !== "dark" && theme !== "light" && "Cargando..."}
              </span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              aria-label="Toggle sound"
              className="size-full"
              type="button"
              onClick={toggleSound}
            >
              {sound ? (
                <Volume2
                  aria-label="system"
                  className="mr-2 size-4 text-neutral-500 transition dark:text-neutral-300"
                />
              ) : (
                <VolumeX
                  aria-label="system"
                  className="mr-2 size-4 text-neutral-500 transition dark:text-neutral-300"
                />
              )}
              <span>{sound ? "Desactivar Sonido" : "Activar Sonido"}</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
