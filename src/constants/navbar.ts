import type {INavbarLink} from "../components/organisms/navbar";

/**
 * NAVBAR_ITEMS:
 * - Sections are separated by first-level arrays. ej: [ [], [] ]
 * - Each section is an array of links. ej: [ {}, {}, {} ]
 * - Each link is an object with the following properties:
 *  > icon: Icon name from Lucide Icons. ref: https://lucide.dev/icons/
 *  > label: Link label.
 *  > link: URL.
 *  > ...rest: Any other property that can be passed to an anchor element.
 *
 * - On implementation, the Navbar component will iterate over the sections and links to render the links. sections will be separated by a divider (<hr/>).
 * - For accessibility, the Navbar component will use the key of the first letter of the label as an accessKey for the link. remember to use unique labels.
 */

export const NAVBAR_ITEMS: INavbarLink[][] = [
  [
    {
      icon: "Home",
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
  [
    {
      icon: "Github",
      label: "GitHub",
      link: "https://github.com/jorgepeniaranda",
      target: "_blank",
      referrerPolicy: "no-referrer",
    },
    {
      icon: "Linkedin",
      label: "Linkedin",
      link: "https://www.linkedin.com/in/jorgepeniaranda/",
      target: "_blank",
      referrerPolicy: "no-referrer",
    },
    {
      icon: "Instagram",
      label: "Instagram",
      link: "https://www.instagram.com/jorgepeniaranda",
      target: "_blank",
      referrerPolicy: "no-referrer",
    },
  ],
] as const;
