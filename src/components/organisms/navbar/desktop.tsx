import type {INavbarSection} from "./navbar";

import React from "react";
import {MotionValue, motion, useMotionValue, useSpring, useTransform} from "framer-motion";
import {Loader, Moon, Sun, Volume2, VolumeX, icons} from "lucide-react";
import {Fragment, useRef} from "react";

import {NavbarAnimationConfig} from "../../../constants/styles";
import {useSoundStore} from "../../../services/storage/sound";
import {useThemeStore} from "../../../services/storage/theme";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../../ui/tooltip";

//#region NAVBAR

/**
 * Desktop navigation bar component.
 * @param {Object} props - The props object.
 * @param {INavbarSection[]} props.items - Array of navigation section objects.
 * @returns {JSX.Element} The navigation bar component.
 */
export function DesktopNavbar({items}: {items: INavbarSection[]}) {
  const {theme, toggleTheme} = useThemeStore();
  const {isSoundEnabled, toggleSound} = useSoundStore();

  // Motion value for mouse position (used for hover effect).
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      aria-label="Main navigation"
      className="fixed bottom-6 left-1/2 z-50 hidden h-14 -translate-x-1/2 items-center justify-evenly space-x-3 rounded-3xl bg-neutral-50/90 p-3 ring-1 ring-neutral-300 backdrop-blur-2xl transition dark:bg-neutral-950/50 dark:ring-neutral-700 md:flex"
      // Reset mouseX on mouse leave
      onMouseLeave={() => mouseX.set(Infinity)}
      // Update mouseX on mouse move for hover effect
      onMouseMove={(e) => mouseX.set(e.pageX)}
    >
      {/* Render navigation links */}
      {items.map((section, sectionIndex) => (
        <Fragment key={crypto.randomUUID()}>
          <ul aria-label="Link List" className="flex items-center justify-center space-x-3">
            {section.items.map(({label, link, icon, ...props}) => {
              // Dynamically load the icon based on the icon string
              const Icon = icons[icon];

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
              );
            })}
          </ul>
          {sectionIndex < items.length - 1 && <NavbarSeparator />}
        </Fragment>
      ))}
      {items.length > 0 && <NavbarSeparator />}

      {/* Render navigation buttons (theme and sound toggle) */}
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
            {theme === "light" && (
              <Sun
                aria-label="light"
                className="size-3/5 text-neutral-500 transition dark:text-neutral-300"
              />
            )}
            {theme === "dark" && (
              <Moon
                aria-label="dark"
                className="size-3/5 text-neutral-500 transition dark:text-neutral-300"
              />
            )}
            {theme !== "dark" && theme !== "light" && (
              <Loader
                aria-label="dark"
                className="size-3/5 animate-spin text-neutral-500 transition dark:text-neutral-300"
              />
            )}
            <span className="sr-only">
              Current:
              <b>
                {theme === "light" && "Light"}
                {theme === "dark" && "Dark"}
                {theme !== "dark" && theme !== "light" && "Loading"}
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
            {isSoundEnabled ? (
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
              <b>{isSoundEnabled ? "Sound On" : "Sound Off"}</b>
            </span>
          </button>
        </NavbarItem>
      </ul>
    </motion.nav>
  );
}
//#endregion

//#region NAVBAR ITEM

/**
 * A motion-enabled navigation item that animates based on mouse movement.
 * @param {Object} props - The props object.
 * @param {MotionValue<number>} props.mouseX - The motion value representing the mouse's X position.
 * @param {React.ReactNode} [props.children] - The content of the navigation item.
 * @returns {JSX.Element} The navigation item component.
 */
function NavbarItem({mouseX, children}: {mouseX: MotionValue<number>; children?: React.ReactNode}) {
  const ref = useRef<HTMLLIElement>(null);

  // Calculate the distance between the mouse and the navbar item for animation purposes.
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {x: 0, width: 0};

    return val - bounds.x - bounds.width / 2;
  });

  // Synchronize width with mouse distance, according to the configuration.
  const widthSync = useTransform(
    distance,
    NavbarAnimationConfig.transform.inputRange,
    NavbarAnimationConfig.transform.outputRange,
  );

  // Apply spring animation to width.
  const width = useSpring(widthSync, NavbarAnimationConfig.spring);

  return (
    <motion.li
      ref={ref}
      aria-label="Navigation Item"
      className="flex aspect-square items-center justify-center rounded-full border border-neutral-100 bg-neutral-100 text-center transition dark:border-neutral-700 dark:bg-neutral-900/80"
      style={{width}}
    >
      {children}
    </motion.li>
  );
}
//#endregion

//#region NAVBAR SEPARATOR

/**
 * A separator element between sections in the navigation bar.
 * @returns {JSX.Element} The separator element.
 */
function NavbarSeparator() {
  return <hr className="h-8 w-0.5 bg-neutral-400/20 dark:bg-neutral-600/20" />;
}
//#endregion
