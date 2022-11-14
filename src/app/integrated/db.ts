import { Job } from '@interfaces/job';
import { Page } from '@interfaces/page';
import { Profile } from '@interfaces/profile';
import { Project } from '@interfaces/project';
import { Site } from '@interfaces/site';

/**
 * Integrated services will fetch data from the below object.
 */

const data: {
    profile?: Profile;
    jobs: Job[];
    site: Site;
    projects: Project[];
    pages: Page[];
} = {
    jobs: [],
    site: {},
    projects: [],
    pages: [],
};

export const pages = data.pages;
export const projects = data.projects;
export const profile = data.profile;
export const jobs = data.jobs;
export const site = data.site;
