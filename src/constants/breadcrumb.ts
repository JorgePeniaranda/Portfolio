/**
 * @description Breadcrumb template for the dashboard
 * - This object is used to generate the breadcrumb in the dashboard layout.
 * - The object is structured as follows:
 * > key: URL path.
 * > value: Array of objects with the following properties:
 * > title: Breadcrumb title.
 * > url: Breadcrumb URL.
 * - To implement, it is necessary to pass one of the arrays to the dashboard layout component to be rendered.
 */
export const DASHBOARD_BREADCRUMB_TEMPLATE: Record<
  string,
  Array<{
    title: string;
    url?: string;
  }>
> = {
  "/vault": [
    {
      title: "Panel de control",
      url: "/vault",
    },
  ],
  "/vault/views/project": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Vistas",
    },
    {
      title: "Proyectos",
    },
  ],
  "/vault/views/project/create": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Vistas",
    },
    {
      title: "Proyectos",
      url: "/vault/views/project",
    },
    {
      title: "Crear",
    },
  ],
  "/vault/views/project/edit": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Vistas",
    },
    {
      title: "Proyectos",
      url: "/vault/views/project",
    },
    {
      title: "Editar",
    },
  ],
  "/vault/views/project/details": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Vistas",
    },
    {
      title: "Proyectos",
      url: "/vault/views/project",
    },
    {
      title: "Detalles",
    },
  ],
  "/vault/views/stack": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Vistas",
    },
    {
      title: "Stack",
    },
  ],
  "/vault/views/stack/create": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Vistas",
    },
    {
      title: "Stack",
      url: "/vault/stack/collaborators",
    },
    {
      title: "Crear",
    },
  ],
  "/vault/views/stack/edit": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Vistas",
    },
    {
      title: "Stack",
      url: "/vault/stack/collaborators",
    },
    {
      title: "Editar",
    },
  ],
  "/vault/views/stack/details": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Vistas",
    },
    {
      title: "Stack",
      url: "/vault/stack/collaborators",
    },
    {
      title: "Detalles",
    },
  ],
  "/vault/views/collaborators": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Vistas",
    },
    {
      title: "Colaboradores",
    },
  ],
  "/vault/views/collaborators/create": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Vistas",
    },
    {
      title: "Colaboradores",
      url: "/vault/views/collaborators",
    },
    {
      title: "Crear",
    },
  ],
  "/vault/views/collaborators/edit": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Vistas",
    },
    {
      title: "Colaboradores",
      url: "/vault/views/collaborators",
    },
    {
      title: "Editar",
    },
  ],
  "/vault/views/collaborators/details": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Vistas",
    },
    {
      title: "Colaboradores",
      url: "/vault/views/collaborators",
    },
    {
      title: "Detalles",
    },
  ],
  "/vault/design/stack-flow": [
    {
      title: "Panel de control",
      url: "/vault",
    },
    {
      title: "Diseño",
    },
    {
      title: "Stack Flow",
    },
  ],
} as const;
