export interface ProjectImage {
    src: string;
    alt: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    techDescription: string;
    logo: ProjectImage;
    images: ProjectImage[];
    tags: string[];
    demo: {
        text?: string;
        url: string;
        disclaimer?: string;
    },
    links: {
        id: string;
        name: string;
        href: string;
        icon: string;
    }[];
}