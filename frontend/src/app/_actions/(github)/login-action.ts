"use server"

import { signIn } from "@/src/auth";

export default async function githubLogin() {
    try {
        await signIn("github", {redirectTo: "/dashboard"});
    } catch (error) {
        throw error;
    }
}