"use server"
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function isAuthenticated(request: Request): Promise<boolean> {
    const cookie = request.headers.get("cookie");
    const match = cookie?.match(/acess_token=([^;]+)/)
    if (!match) return false;

    try {
        await jwtVerify(match[1], SECRET);
        return true;
    } catch (error) {
        return false;
    }
}
