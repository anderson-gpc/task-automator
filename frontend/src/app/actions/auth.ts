"use server";

export default async function auth(): Promise<boolean> {
  try {
    await fetch("http://localhost:3001/auth/github");
    return true;
  } catch (error) {
    console.log("erro", error);
    return false;
  }
}
