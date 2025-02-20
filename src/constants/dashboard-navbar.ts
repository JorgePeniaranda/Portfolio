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
      title: 'Panel',
      items: [
        {
          title: 'Inicio',
          url: '/vault',
          isActive: true,
        },
      ],
    },
    {
      title: 'Vistas',
      url: '#',
      items: [
        {
          title: 'Proyectos',
          url: '/vault/views/project',
        },
        {
          title: 'Stack',
          url: '/vault/views/stack',
        },
        {
          title: 'Colaboradores',
          url: '/vault/views/collaborators',
        },
      ],
    },
    {
      title: 'Diseño',
      url: '#',
      items: [
        {
          title: 'Stack flow',
          url: '/vault/design/stack-flow',
        },
      ],
    },
  ],
};
