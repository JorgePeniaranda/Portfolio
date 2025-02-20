import type { icons } from 'lucide-react';

export interface NavbarSection {
  icon: keyof typeof icons;
  label: string;
  items: NavbarLink[];
}

export interface NavbarLink extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  icon: keyof typeof icons;
  label: string;
  link: string;
}

export interface DashboardNavbarItem {
  title: string;
  url?: string;
  items: DashboardNavbarSubItem[];
}

export interface DashboardNavbarSubItem {
  title: string;
  url: string;
}
