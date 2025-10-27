export class UserDTO {
    private githubId: string;
    private displayName: string;
    private username: string;
    private acessToken: string;
    private photo: string;

    constructor(githubId: string, displayName: string, username: string, acessToken: string, photo: string) {
        this.githubId = githubId;
        this.displayName = displayName;
        this.username = username;
        this.acessToken = acessToken;
        this.photo = photo;
    }

    getGithubId() {
        return this.githubId;
    }

    getDisplatName() {
        return this.displayName;
    }

    getUsername() {
        return this.username;
    }

    getAcessToken() {
        return this.acessToken;
    }

    getPhoto() {
        return this.photo;
    }
}
