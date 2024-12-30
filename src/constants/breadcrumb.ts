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
  "/vault/views/projects": [
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
