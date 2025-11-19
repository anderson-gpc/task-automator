import NextAuth, { User } from "next-auth";
import GitHub from "next-auth/providers/github";
import { getRefinedAcessToken } from "@/src/actions/database/token-action";

declare module "next-auth" {
  interface Session {
    user: User & { githubProfile: any };
    acessToken: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  trustHost: true,
  secret: process.env.NEXT_SECRET!,
  callbacks: {
    async jwt({ token, profile }) {
      return { githubProfile: profile, ...token };
    },
    async session({ session, token }) {
      session.user.githubProfile = token.githubProfile;
      
      const refinedAcessToken = await getRefinedAcessToken(
        session.user.githubProfile.id
      );

      if (refinedAcessToken != null) {
        session.acessToken = refinedAcessToken;
      }
      return session;
    },
  },
});
