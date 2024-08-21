import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../Prisma";
import { compare } from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        phone: {
          label: "Email",
          type: "text",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.members.findUnique({
          where: { email: credentials.email },
          include: {
            roles: true,
          },
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          phone: user.phone,
          role: user.roles.name,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
};
