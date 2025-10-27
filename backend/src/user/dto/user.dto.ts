export class UserDTO {
  constructor(
    public readonly githubId: string,
    public readonly displayName: string,
    public readonly username: string,
    public readonly photo: string
  ) {}
}
