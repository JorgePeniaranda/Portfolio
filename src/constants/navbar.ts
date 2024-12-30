import type {INavbarSection} from "../components/organisms/navbar/navbar";

import {PERSONAL_ACCOUNTS} from "./external";

/**
 * @description
 * - Sections are separated by first-level arrays. ej: [ [], [] ]
 * - Each section is an object with the following properties:
 *  > icon: Icon name from Lucide Icons. ref: https://lucide.dev/icons/
 *  > label: Section label.
 *  > items: Array of links. ej: [ {}, {} ]
 * - Each link is an object with the following properties:
 *  > icon: Icon name from Lucide Icons. ref: https://lucide.dev/icons/
 *  > label: Link label.
 *  > link: URL.
 *  > ...rest: Any other property that can be passed to an anchor element.
 * - On implementation, the Navbar component will iterate over the sections and links to render the links. sections will be separated by a divider (<hr/>).
 * - For accessibility, the Navbar component will use the key of the first letter of the label as an accessKey for the link. remember to use unique labels.
 */

export const NAVBAR_ITEMS: INavbarSection[] = [
  {
    icon: "Map",
    label: "Site Navegation",
    items: [
      {
        icon: "House",
        label: "Home",
        link: "/",
      },
      {
        icon: "Fingerprint",
        label: "About",
        link: "/about",
      },
      {
        icon: "Layers",
        label: "Stack",
        link: "/stack",
      },
      {
        icon: "Construction",
        label: "Projects",
        link: "/projects",
      },
      {
        icon: "Rss",
        label: "Blog",
        link: "/blog",
      },
    ],
  },
  {
    icon: "Link",
    label: "Social Links",
    items: [
      {
        icon: "Github",
        label: "GitHub",
        link: PERSONAL_ACCOUNTS.github.url,
        target: "_blank",
        referrerPolicy: "no-referrer",
      },
      {
        icon: "Linkedin",
        label: "Linkedin",
        link: PERSONAL_ACCOUNTS.linkedin.url,
        target: "_blank",
        referrerPolicy: "no-referrer",
      },
      {
        icon: "Instagram",
        label: "Instagram",
        link: PERSONAL_ACCOUNTS.instagram.url,
        target: "_blank",
        referrerPolicy: "no-referrer",
      },
    ],
  },
];

/**
 * @description Dashboard Navbar Items
 * - This object is used to generate the sidebar menu in the dashboard layout.
 * - The object is structured as follows:
 * > navMain: Array of objects with the following properties:
 * > title: Section title.
 * > url: Section URL.
 * > items: Array of objects with the following properties:
 * > title: Link title.
 * > url: Link URL.
 * > isActive: Boolean to set the active state of the link.
 * - On implementation, the DashboardLayout component will iterate over the navMain array to render the sidebar menu.
 */
export const DASHBOARD_NAVBAR_ITEMS: {
  navMain: {
    title: string;
    url?: string;
    items: {
      title: string;
      url: string;
      isActive?: boolean;
    }[];
  }[];
} = {
  navMain: [
    {
      title: "Panel",
      items: [
        {
          title: "Inicio",
          url: "/vault",
          isActive: true,
        },
      ],
    },
    {
      title: "Vistas",
      url: "#",
      items: [
        {
          title: "Proyectos",
          url: "/vault/views/project",
        },
        {
          title: "Stack",
          url: "/vault/views/stack",
        },
        {
          title: "Colaboradores",
          url: "/vault/views/collaborators",
        },
      ],
    },
    {
      title: "Diseño",
      url: "#",
      items: [
        {
          title: "Stack flow",
          url: "/vault/design/stack-flow",
        },
      ],
    },
  ],
};
