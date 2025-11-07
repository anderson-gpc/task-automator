import { NextResponse } from "next/server";

export async function GET() {
  const redirectUrl = `${process.env.API_URL}/auth/github`;
  return NextResponse.redirect(redirectUrl);
}
  