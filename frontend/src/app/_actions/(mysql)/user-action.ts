"use server";

import {prisma} from "@/lib/(prisma)/prisma";
import { User } from "@/src/interfaces/user-interface";
import { PrismaError } from "@/src/lib/(prisma)/PrismaError";

export async function createUser(data: User): Promise<boolean> {
  try {
    await prisma.user.create({
      data: data,
    });
    return true;
  } catch (e) {
    throw PrismaError.handle(e);
  }
}

export async function verifyUser(data: User): Promise<boolean> {
  try {
    const user = await prisma.user.findFirst({ where: { githubId: data.githubId } });
    if (user != null) return true;
    else {
      await createUser(data)
      return true;
    }
  } catch (e) {
    throw PrismaError.handle(e);
  }
}

export async function verifyRefinedAcessToken(githubId: number): Promise<boolean> {
  try {
    const user = await prisma.user.findFirst({where: {githubId: githubId}});
    if (user?.refinedAcessToken) return true;
    return false;
  } catch (e) {
    throw PrismaError.handle(e);
  }
}
