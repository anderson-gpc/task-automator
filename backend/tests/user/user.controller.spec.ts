import { Test } from "@nestjs/testing";
import { JWTGuard } from "@/auth/auth.guard";
import { UserController } from "@/user/user.controller";
import { UserService } from "@/user/user.service";

describe("UserController", () => {
  let service: UserService;
  let controller: UserController;

  beforeEach(async () => {
    const mockService = {
      addRefinedAcessToken: jest.fn().mockResolvedValue(undefined),
      deleteRefinedAcessToken: jest.fn().mockResolvedValue(true),
    };

    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockService }],
    })
      .overrideGuard(JWTGuard)
      .useValue({ canActivate: () => true })
      .compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it("verificar se está adicionando o token", async () => {
    const req = {user: {githubid: 'user-123'}} as any;
    const body = {token: "my-token"}
    await controller.putRefinedAcessToken(req, body);
    expect(service.addRefinedAcessToken).toHaveBeenCalledTimes(1);
    expect(service.addRefinedAcessToken).toHaveBeenCalledWith(body.token ,req.user.githubid)
  });
});
