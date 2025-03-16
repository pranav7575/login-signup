import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import connectDB from "@/lib/db";
import { compare } from "bcryptjs";
import User from "@/models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email || undefined;
        const password = credentials.password || undefined;

        if (!email || !password) {
          throw new Error("Please enter your email and password");
        }

        await connectDB();

        const user = await User.findOne({ email }).select("+password +role");
        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, user.password);
        if (!isMatched) {
          throw new Error("Password does not match");
        }

        const userData = {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github" || account.provider === "google") {
        await connectDB();

        let existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          // Create a new user if they don't exist
          existingUser = await User.create({
            name: profile.name || "Anonymous",
            email: profile.email,
            image: profile.image || profile.picture,
            authproviderId: account.providerAccountId,
            role: "user",
          });
        }

        user.id = existingUser._id;
        user.role = existingUser.role;
      }

      return true;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
});