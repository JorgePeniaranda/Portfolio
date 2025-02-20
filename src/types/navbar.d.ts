import type { icons } from 'lucide-react';

/**
 * Represents a section in the navbar.
 * A section typically includes an icon, a label, and a list of links.
 */
export interface NavbarSection {
  icon: keyof typeof icons;
  label: string;
  items: NavbarLink[];
}

/**
 * Represents a link in the navbar.
 * Includes an icon, a label, and the link destination.
 */
export interface NavbarLink extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  icon: keyof typeof icons;
  label: string;
  link: string;
}
