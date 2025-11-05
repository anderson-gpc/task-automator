import { Test } from "@nestjs/testing";
import { GithubController } from "@/github/github.controller";
import { GithubService } from "@/github/github.service";
import { JWTGuard } from "@/auth/auth.guard";
import { ConnectOctokit } from "@/utils/connect-octokit";
import { CallHandler } from "@nestjs/common";

describe("GithubController", () => {
  let controller: GithubController;
  let service: GithubService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [GithubController],
      providers: [GithubService],
    })
      .overrideGuard(JWTGuard)
      .useValue({ canActivate: () => true })
      .overrideInterceptor(ConnectOctokit)
      .useValue({
        intercept: (_: any, next: CallHandler<any>) => next.handle(),
      })
      .compile();

    controller = module.get<GithubController>(GithubController);
    service = module.get<GithubService>(GithubService);
  });

  it("[TESTE : GithubController] Verificar se está chamando [GithubService.getFriends] corretamente", async () => {
    const mockOctokit = {
      request: jest.fn().mockImplementation((endpoint: string) => {
        if (endpoint.includes("followers"))
          return { data: [{ id: 111 }, { id: 222 }] };
        if (endpoint.includes("following"))
          return { data: [{ id: 111 }, { id: 333 }] };
      }),
    };

    const req = { octokit: mockOctokit };
    const spy = jest.spyOn(service, "getFriends");
    const result = await controller.getFriends(req);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      [{ id: 111 }, { id: 222 }],
      [{ id: 111 }, { id: 333 }]
    );
    expect(result).toEqual([{ id: 111 }]);
  });

  it("[TESTE : GithubController] Verificar se está chamando [GithubService.getNotFollowers] corretamente", async () => {
    const mockOctokit = {
      request: jest.fn().mockImplementation((endpoint: string) => {
        if (endpoint.includes("followers"))
          return { data: [{ id: 111 }, { id: 222 }] };
        if (endpoint.includes("following"))
          return { data: [{ id: 111 }, { id: 333 }] };
      }),
    };

    const req = { octokit: mockOctokit };
    const spy = jest.spyOn(service, "getNotFollowers");
    const result = await controller.getNotFollowers(req);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      [{ id: 111 }, { id: 222 }],
      [{ id: 111 }, { id: 333 }]
    );
    expect(result).toEqual([{ id: 333 }]);
  });

  it("[TESTE : GithubController] Verificar se está retornando as issues corretamente", async () => {
    const mockOctokit = {
      request: jest
        .fn()
        .mockResolvedValue({ data: [{ id: 111 }, { id: 222 }] }),
    };
    const req = { octokit: mockOctokit };
    const result = await controller.getIssues(req);
    expect(mockOctokit.request).toHaveBeenCalledTimes(1);
    expect(mockOctokit.request).toHaveBeenCalledWith("GET /user/issues");

    expect(result).toEqual([{ id: 111 }, { id: 222 }]);
  });

  it("[TESTE : GithubController] Verificar se está parando de seguir corretamente", async () => {
    const mockOctokit = {
      request: jest.fn().mockResolvedValue({ status: 204 }),
    };
    const req = { octokit: mockOctokit };
    const response = await controller.deleterFollowing("fulano", req);
    expect(mockOctokit.request).toHaveBeenCalledTimes(1);
    expect(mockOctokit.request).toHaveBeenLastCalledWith(
      "DELETE /user/following/fulano"
    );
    expect(response).toEqual({ status: 204 });
  });

  it("[TESTE : GithubController] Verificar se está pegando a network corretamente", async () => {
    const mockOctokit = {
      request: jest.fn().mockImplementation((param: string) => {
        if (param.includes("/following")) return { data: [{ id: 111 }] };
        if (param.includes("/followers")) return { data: [{ id: 222 }] };
      }),
    };
    const req = { octokit: mockOctokit, user: { userName: "Usuario" } };
    const resultFollowing = await controller.viewNetwork("following", req);
    const resultFollowers = await controller.viewNetwork("followers", req);

    expect(mockOctokit.request).toHaveBeenCalledTimes(2);
    expect(mockOctokit.request).toHaveBeenNthCalledWith(
      1,
      "GET /users/Usuario/following"
    );
    expect(mockOctokit.request).toHaveBeenNthCalledWith(
      2,
      "GET /users/Usuario/followers"
    );

    expect(resultFollowing).toEqual([{ id: 111 }]);
    expect(resultFollowers).toEqual([{ id: 222 }]);
  });
});
