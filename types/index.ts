export interface Project {
  iconURL: string;
  created?: string;
  images: string[];
  title: string;
  description: string;
  links?: ProjectLinks;
}

interface ProjectLinks {
  live?: string;
  github?: string;
}
