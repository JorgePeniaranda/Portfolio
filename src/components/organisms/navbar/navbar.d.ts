import { icons } from 'lucide-react'

export interface INavbarSection {
  icon: keyof typeof icons
  label: string
  items: INavbarLink[]
}

export interface INavbarLink
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  icon: keyof typeof icons
  label: string
  link: string
}
