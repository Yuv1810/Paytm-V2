import { getServerSession } from "next-auth";
import { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Define your auth options
export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Optionally add callbacks, pages, session, etc.
};

// Utility to get the server-side session
export async function getSessionServer() {
  return await getServerSession(authOptions);
}
