export class UserDTO {
  login: string;
  avatar_url: string;
  url: string;
  name: string;

  constructor(data: Partial<UserDTO>) {
    this.login = data.login ?? "";
    this.avatar_url = data.avatar_url ?? "";
    this.url = data.url ?? "";
    this.name = data.name ?? "";
  }
}
