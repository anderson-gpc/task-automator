import { NextResponse } from "next/server";

export async function GET() {
  const redirectUrl = "http://localhost:3001/auth/github";
  return NextResponse.redirect(redirectUrl);
}
