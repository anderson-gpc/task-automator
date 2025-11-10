"use server";

import { githubClient } from "@/src/github.client";
import { cookies } from "next/headers";
import * as jose from "jose";
import { UserDTO } from "@/src/dto/UserDTO";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function login(): Promise<any> {
  try {
    const { data } = await githubClient.request("GET /user");
    const jwt = await new jose.SignJWT(data)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("15min")
      .sign(SECRET);
    (await cookies()).set("access_token", jwt, { httpOnly: true, path: "/" });
    new UserDTO({
      login: data.login,
      avatar_url: data.avatar_url,
      url: data.html_url,
      name: data.name!,
    });
    return true;
  } catch (error) {
    throw new Error("Erro ao fazer login");
  }
}
