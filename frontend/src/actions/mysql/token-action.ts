"use server";

import { prisma } from "@/lib/prisma/prisma";
import { PrismaError } from "@/lib/prisma/PrismaError";
import encrypt from "@/lib/brycpt/encrypt";
import { revalidatePath } from "next/cache";
import { octokitClient } from "@/src/lib/github/octokit";

export async function verifyRefinedAcessToken(
  githubId: number
): Promise<boolean> {
  try {
    const user = await prisma.user.findFirst({ where: { githubId: githubId } });
    if (user?.refinedAcessToken) return true;
    return false;
  } catch (e) {
    throw PrismaError.handle(e);
  }
}

export async function addRefinedAcessToken(
  githubId: number,
  login: string,
  token: string
): Promise<boolean> {
  try {
    
    const verify = await octokitClient(1, token, login);
    if (!verify) {
      return false;
    }
    
    const tokenEncrypted = await encrypt(token);
    await prisma.user.update({
      data: { refinedAcessToken: tokenEncrypted },
      where: { githubId: githubId },
    });

    revalidatePath("/dashboard");

    return true;
  } catch (e) {
    throw PrismaError.handle(e);
  }
}

export async function removeRefinedAcessToken(
  githubId: number
): Promise<boolean> {
  try {
    await prisma.user.update({
      data: { refinedAcessToken: null },
      where: { githubId: githubId },
    });
    return true;
  } catch (e) {
    throw PrismaError.handle(e);
  }
}

export async function getRefinedAcessToken(
  githubId: number
): Promise<string | null> {
  try {
    const user = await prisma.user.findFirst({ where: { githubId: githubId } });
    if (user?.refinedAcessToken === null) return null;
    else return user?.refinedAcessToken!;
  } catch (e) {
    throw PrismaError.handle(e);
  }
}
