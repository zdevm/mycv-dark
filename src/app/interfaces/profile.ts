interface ProfileSocialLink {
    name: string;
    href: string;
    icon: string; // bootstrap icon
}

export interface Profile {
    firstName: string;
    lastName: string;
    occupation: string;
    about: string;
    image?: string;
    socialLinks: ProfileSocialLink[];
    openToWork: boolean;
}
