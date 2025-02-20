import type { MotionValue } from 'framer-motion';

import { motion, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

import { NavbarAnimationConfig } from '@/constants/app-styles';

/**
 * A motion-enabled navigation item that animates based on mouse movement.
 * @param params - Component properties
 * @param params.mouseX - Motion value for the mouse X position
 * @param params.children - Child elements to render inside the item
 * @returns A motion-enabled navigation item
 */
export function DesktopNavbarItem({
  mouseX,
  children,
}: {
  mouseX: MotionValue<number>;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);

  // Calculate the distance between the mouse and the navbar item for animation purposes.
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

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
      aria-label='Navigation Item'
      className='flex aspect-square items-center justify-center rounded-full border border-neutral-100 bg-neutral-100 text-center transition dark:border-neutral-700 dark:bg-neutral-900/80'
      style={{ width }}
    >
      {children}
    </motion.li>
  );
}
