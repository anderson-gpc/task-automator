import { createCipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";

export function EncryptToken() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function name(...args: any[]) {
        const iv = randomBytes(16);
        const token = args[0];
        const securityKey = (await promisify(scrypt)("mypassword", 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', securityKey, iv);
        const encryptToken = Buffer.concat([
            cipher.update(token),
            cipher.final()
        ])

        args[0] = encryptToken.toString('base64');
        const result = await originalMethod.apply(this, args);

        return result

    }
    return descriptor;
  };
}
