export interface People {
    login: string;
    githubId: number;
}

export interface User extends People {
    refinedAcessToken?: string;
}

export interface UserRepo extends User {
    github_repository:  Repo
}

export interface Repo {
    html_url: string;
    name: string;
}
