import type { icons } from 'lucide-react';

/**
 * Represents a section in the navbar.
 * A section typically includes an icon, a label, and a list of links.
 */
export interface INavbarSection {
  /**
   * The icon to be used for the section, selected from the available icons in lucide-react.
   */
  icon: keyof typeof icons;

  /**
   * The label to be displayed for the navbar section.
   */
  label: string;

  /**
   * A list of navbar links within this section.
   */
  items: INavbarLink[];
}

/**
 * Represents a link in the navbar.
 * Includes an icon, a label, and the link destination.
 */
export interface INavbarLink extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /**
   * The icon to be used for the navbar link, selected from the available icons in lucide-react.
   */
  icon: keyof typeof icons;

  /**
   * The label to be displayed for the navbar link.
   */
  label: string;

  /**
   * The URL or path that the navbar link points to.
   */
  link: string;
}
