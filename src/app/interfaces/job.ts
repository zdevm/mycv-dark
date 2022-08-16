export interface Job {
    companyName: string;
    description: string;
    position: string;
    location: {
        city: string;
        country: string;
        address: string;
        website: string;
    },
    duration: {
        from: string; // YYYY-MM-DD
        to: string; // YYYY-MM-DD
    }
}