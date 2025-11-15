"use server";

import crypto from "crypto";
import { descrypt } from "./descrypt";


const key = Buffer.from(process.env.CRYPT_KEY!, "base64");

export default async function encrypt(token: string): Promise<string> {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([cipher.update(token), cipher.final()]);
  const tag = cipher.getAuthTag();

  const tokenEncrypted = [
    encrypted.toString("base64"),
    iv.toString("base64"),
    tag.toString("base64"),
  ].join(":");

  return tokenEncrypted;
}