import NextAuth from "next-auth";
import { authOptions } from "../../lib/auth"; // adjust the path based on where your auth options are

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
