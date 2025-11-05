import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "@/user/user.service";
import { EncryptionService } from "@/utils/encryption.service";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { User } from "@/database/entity/user.entity";

describe("UserService", () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let configService: ConfigService;
  let encryptionService: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        EncryptionService,
        {
          provide: "USER_REPOSITORY",
          useValue: {}, 
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
});
