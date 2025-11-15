"use server"

import { prisma } from "@/lib/(prisma)/prisma";
import { PrismaError } from "@/lib/(prisma)/PrismaError";

export async function verifyRefinedAcessToken(githubId: number): Promise<boolean> {
  try {
    const user = await prisma.user.findFirst({where: {githubId: githubId}});
    if (user?.refinedAcessToken) return true;
    return false;
  } catch (e) {
    throw PrismaError.handle(e);
  }
}
