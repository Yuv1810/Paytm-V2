import { getServerSession } from "next-auth";
import { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma, Prisma } from "@repo/db";
import bcrypt from "bcryptjs";

// Define your auth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phone_No: { label: "Phone No", type: "Number", placeholder: "Phone No"  ,pattern: "^[0-9]{10}$"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials:any, req) {

        console.log(credentials);

        
          try {
          const user : any= await prisma.user.findUnique({
            where:{
              number:credentials?.phone_No
            }
          });

          const passcheck= await bcrypt.compare(credentials?.password, user?.password);

          if(passcheck){
            return user;
          }else{
            throw("Incorrect password");
          }


          } catch (error) {

            return null;

            }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // required for Credentials provider
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user;
      return session;
    },
  },

  // Optionally add callbacks, pages, session, etc.
};

// Utility to get the server-side session
export async function getSessionServer() {
  return await getServerSession(authOptions);
}
