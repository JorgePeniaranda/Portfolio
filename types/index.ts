export interface Project {
  images: string[];
  title: string;
  description: string;
  links: ProjectLinks;
}

interface ProjectLinks {
  live: string;
  github: string;
}