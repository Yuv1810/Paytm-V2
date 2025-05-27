import { getServerSession } from "next-auth";
import { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma} from "@repo/db";
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
        phone_No: { label: "Phone No", type: "text", placeholder: "Enter 10-digit phone number", pattern: "^[0-9]{10}$" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("------------------------");
        console.log(credentials);

        if (!credentials?.phone_No || !credentials?.password) {
          console.log("Missing phone_No or password");
          return null;
        }
        

        const user : any= await prisma.user.findUnique({
          where:{
            number: credentials.phone_No
          }
        });

        console.log(user);

          try {
          const user : any= await prisma.user.findUnique({
            where:{
              number: credentials.phone_No
            }
          });
          console.log("DB USER");
          console.log(user);

          if (!user) {
            console.log("User not Found");
            throw new Error("User not found");
          }

          const passcheck= await bcrypt.compare(credentials?.password, user?.password);

          console.log("passcheck",passcheck);

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
  pages: {
    signIn: "/signin", // 👈 Define your custom sign-in page path here
  },
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
