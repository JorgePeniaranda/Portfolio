interface IProject {
  name: string;
  status: (typeof ProjectStatus)[keyof typeof ProjectStatus];
  stack: (typeof ProjectStack)[keyof typeof ProjectStack];
}

export const ProjectStatus = {
  "Terminado": "Terminado",
  "En Desarrollo": "En Desarrollo",
  "Pausado": "Pausado",
} as const;

export const ProjectStack = {
  "Full-Stack": "Full-Stack",
  "Back-End": "Back-End",
  "Front-End": "Front-End",
} as const;
