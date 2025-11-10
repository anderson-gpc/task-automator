"use server";

import { githubClient } from "@/src/github.client";
import { cookies } from "next/headers";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function login(): Promise<any> {
  const { data } = await githubClient.request("GET /user");
  const jwt = await new jose.SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15min")
    .sign(SECRET);
  (await cookies()).set("access_token", jwt);
  return data;
}
