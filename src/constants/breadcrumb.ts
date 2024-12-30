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
