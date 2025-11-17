"use server";

import { prisma } from "@/lib/prisma/prisma";
import { PrismaError } from "@/lib/prisma/PrismaError";
import encrypt from "@/lib/brycpt/encrypt";

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
  token: string
): Promise<boolean> {
  try {
    const tokenEncrypted = await encrypt(token);
    await prisma.user.update({
      data: { refinedAcessToken: tokenEncrypted },
      where: { githubId: githubId },
    });
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
