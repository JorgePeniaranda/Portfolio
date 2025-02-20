import type { IBreadCrumb } from '@/types/breadcrumb';

/**
 * @description Breadcrumb template for the dashboard
 * - This object is used to generate the breadcrumb in the dashboard layout.
 * - The object is structured as follows:
 * > key: URL path.
 * > value: Array of objects with the following properties:
 * > label: Breadcrumb title.
 * > href: Breadcrumb URL.
 * - To implement, it is necessary to pass one of the arrays to the dashboard layout component to be rendered.
 */
export const DASHBOARD_BREADCRUMB_TEMPLATE = {
  '/vault': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
  ],
  '/vault/views/project': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Vistas',
    },
    {
      label: 'Proyectos',
    },
  ],
  '/vault/views/project/create': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Vistas',
    },
    {
      label: 'Proyectos',
      href: '/vault/views/project',
    },
    {
      label: 'Crear',
    },
  ],
  '/vault/views/project/edit': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Vistas',
    },
    {
      label: 'Proyectos',
      href: '/vault/views/project',
    },
    {
      label: 'Editar',
    },
  ],
  '/vault/views/project/details': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Vistas',
    },
    {
      label: 'Proyectos',
      href: '/vault/views/project',
    },
    {
      label: 'Detalles',
    },
  ],
  '/vault/views/stack': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Vistas',
    },
    {
      label: 'Stack',
    },
  ],
  '/vault/views/stack/create': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Vistas',
    },
    {
      label: 'Stack',
      href: '/vault/stack/collaborators',
    },
    {
      label: 'Crear',
    },
  ],
  '/vault/views/stack/edit': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Vistas',
    },
    {
      label: 'Stack',
      href: '/vault/stack/collaborators',
    },
    {
      label: 'Editar',
    },
  ],
  '/vault/views/stack/details': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Vistas',
    },
    {
      label: 'Stack',
      href: '/vault/stack/collaborators',
    },
    {
      label: 'Detalles',
    },
  ],
  '/vault/views/collaborators': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Vistas',
    },
    {
      label: 'Colaboradores',
    },
  ],
  '/vault/views/collaborators/create': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Vistas',
    },
    {
      label: 'Colaboradores',
      href: '/vault/views/collaborators',
    },
    {
      label: 'Crear',
    },
  ],
  '/vault/views/collaborators/edit': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Vistas',
    },
    {
      label: 'Colaboradores',
      href: '/vault/views/collaborators',
    },
    {
      label: 'Editar',
    },
  ],
  '/vault/views/collaborators/details': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Vistas',
    },
    {
      label: 'Colaboradores',
      href: '/vault/views/collaborators',
    },
    {
      label: 'Detalles',
    },
  ],
  '/vault/design/stack-flow': [
    {
      label: 'Panel de control',
      href: '/vault',
    },
    {
      label: 'Diseño',
    },
    {
      label: 'Stack Flow',
    },
  ],
} as const satisfies Record<string, IBreadCrumb[]>;
