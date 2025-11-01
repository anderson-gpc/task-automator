import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EncryptionService {
  private readonly algorithm: string = "aes-256-ctr";
  private salt: string = "salt";

  async encrypt(token: string, password: string): Promise<string> {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(password, this.salt, 32)) as Buffer;

    const cipher = createCipheriv(this.algorithm, key, iv);
    const encryptToken = Buffer.concat([
      cipher.update(token, "utf-8"),
      cipher.final(),
    ]);

    return `${iv.toString("base64")}:${encryptToken.toString("base64")}`;
  }

  async descrypt(encryptedToken: string, password: string): Promise<string> {
    const [ivBase64, encryptedBase64] = encryptedToken.split(":");

    const iv = Buffer.from(ivBase64!, "base64");
    const encrypted = Buffer.from(encryptedBase64!, "base64");

    const key = (await promisify(scrypt)(password, this.salt, 32)) as Buffer;
    const decipher = createDecipheriv(this.algorithm, key, iv);
    const descripted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return descripted.toString("utf8");
  }
}
