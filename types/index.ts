export type ProjectLinks = {
  live?: string;
  github?: string;
}

export type Project = {
  iconURL: string;
  created?: string;
  images: string[];
  title: string;
  description: string;
  links?: ProjectLinks;
}
