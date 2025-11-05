import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "@/user/user.service";
import { EncryptionService } from "@/utils/encryption.service";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { User } from "@/database/entity/user.entity";
import { createMockRepository } from "@tests/utils/mock-repository";

describe("UserService", () => {
  let service: UserService;
  let encryptionService: EncryptionService;
  let userRepository: Repository<User>;
  let configService: ConfigService;
  let userRepoMock: ReturnType<typeof createMockRepository>;

  beforeEach(async () => {
    userRepoMock = createMockRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        EncryptionService,
        {
          provide: "USER_REPOSITORY",
          useValue: userRepoMock,
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>("USER_REPOSITORY");
    configService = module.get<ConfigService>(ConfigService);
    encryptionService = module.get<EncryptionService>(EncryptionService);
  });

  it("deve estar definido", () => {
    expect(service).toBeDefined();
  });

  it("atualizar o 'acessToken' do usuário", async () => {
    const existingUser: User = {
      id: 1,
      githubId: "12345",
      displayName: "Fulano",
      username: "fulano",
      photo: "url",
      acessToken: "presentAcessToken"
    };

    userRepoMock.findOne.mockResolvedValueOnce(existingUser);

    const input = {
      githubId: "12345",
      displayName: "Fulano",
      username: "fulano",
      photo: "url",
      acessToken: "newAcessToken",
    } as User;

    await service.createUser(input);

    expect(userRepoMock.update).toHaveBeenCalledTimes(1);
    expect(userRepoMock.update).toHaveBeenCalledWith(
      { githubId: "12345" },
      expect.objectContaining({ acessToken: "newAcessToken" })
    );
  });
});
