import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/client";
import bcrypt from "bcryptjs"



export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token }) {
     
      return token;
    },
  },

  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        let user = null;

        user = await prisma.user.findUnique({
          where: {
            email: credentials.email 
          },
        });

        if (!user) {
          throw new Error("User not found!");
        }

        const match = await bcrypt.compare(credentials.password, user.password);

        if (!match) {
          throw new Error("Wrong credentials!");
        }

        return user;
      },
    }),
  ],
});
