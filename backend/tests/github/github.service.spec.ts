import { GithubService } from "../../src/github/github.service";

describe("GithubService", () => {
  let service: GithubService;

  beforeEach(async () => {
    service = new GithubService();
  });

  it("deve retornar somente os amigos", () => {
    const following = [
      { id: 111, name: "Fulano" },
      { id: 222, name: "Cicrano" },
      { id: 333, name: "Beutrano" },
    ];
    const followers = [
      { id: 111, name: "Fulano" },
      { id: 222, name: "Cicrano" },
    ];
    const result = service.getFriends(followers, following);

    expect(result).toEqual([
      { id: 111, name: "Fulano" },
      { id: 222, name: "Cicrano" },
    ]);
  });

  it("deve retornar somente quem não me segue", () => {
    const following = [
      { id: 111, name: "Fulano" },
      { id: 222, name: "Cicrano" },
      { id: 333, name: "Beutrano" },
    ];
    const followers = [
      { id: 111, name: "Fulano" },
      { id: 222, name: "Cicrano" },
    ];
    const result = service.getNotFollowers(followers, following);

    expect(result).toEqual([{ id: 333, name: "Beutrano" }]);
  });
});
