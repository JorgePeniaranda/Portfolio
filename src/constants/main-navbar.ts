import type { NavbarSection } from '@/types/navbar';

import { PERSONAL_ACCOUNTS } from './social-media';

/**
 * @description
 * - Sections are separated by first-level arrays. ej: [ [], [] ]
 * - Each section is an object with the following properties:
 * > icon: Icon name from Lucide Icons. ref: https://lucide.dev/icons/
 * > label: Section label.
 * > items: Array of links. ej: [ {}, {} ]
 * - Each link is an object with the following properties:
 * > icon: Icon name from Lucide Icons. ref: https://lucide.dev/icons/
 * > label: Link label.
 * > link: URL.
 * > ...rest: Any other property that can be passed to an anchor element.
 * - On implementation, the Navbar component will iterate over the sections and links to render the links. sections will be separated by a divider (<hr/>).
 * - For accessibility, the Navbar component will use the key of the first letter of the label as an accessKey for the link. remember to use unique labels.
 */
export const NAVBAR_ITEMS: NavbarSection[] = [
  {
    icon: 'Map',
    label: 'Site Navegation',
    items: [
      {
        icon: 'House',
        label: 'Home',
        link: '/',
      },
      {
        icon: 'Fingerprint',
        label: 'About',
        link: '/about',
      },
      {
        icon: 'Layers',
        label: 'Stack',
        link: '/stack',
      },
      {
        icon: 'Construction',
        label: 'Projects',
        link: '/projects',
      },
      {
        icon: 'Rss',
        label: 'Blog',
        link: '/blog',
      },
    ],
  },
  {
    icon: 'Link',
    label: 'Social Links',
    items: [
      {
        icon: 'Github',
        label: 'GitHub',
        link: PERSONAL_ACCOUNTS.github.url,
        target: '_blank',
        referrerPolicy: 'no-referrer',
      },
      {
        icon: 'Linkedin',
        label: 'Linkedin',
        link: PERSONAL_ACCOUNTS.linkedin.url,
        target: '_blank',
        referrerPolicy: 'no-referrer',
      },
      {
        icon: 'Instagram',
        label: 'Instagram',
        link: PERSONAL_ACCOUNTS.instagram.url,
        target: '_blank',
        referrerPolicy: 'no-referrer',
      },
    ],
  },
];
