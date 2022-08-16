export interface ProjectImage {
    src: string;
    alt: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    logo: ProjectImage;
    images: ProjectImage[];
    tags: string[];
}