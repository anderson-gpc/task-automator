"use server";

import crypto from "crypto";

const key = Buffer.from(process.env.CRYPT_KEY!, "base64");

export async function descrypt(token: string) {
  const [encryptedBase64, ivBase64, tagBase64] = token.split(":");

  const encrypted = Buffer.from(encryptedBase64, "base64");
  const iv = Buffer.from(ivBase64, "base64");
  const tag = Buffer.from(tagBase64, "base64");

  const deciper = crypto.createDecipheriv("aes-256-gcm", key, iv);
  deciper.setAuthTag(tag);

  const descrypted = Buffer.concat([
    deciper.update(encrypted),
    deciper.final(),
  ]);

  return descrypted.toString();
}
