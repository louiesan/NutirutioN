import NextAuth, { Account, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import yusre from "./lib/models/User";
import { ConnectDB } from "./lib/database";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

declare module "next-auth" {
  interface session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
      createdAt?: Date;
    };
  }

  interface User {
    role: string;
  }

  interface jwt {
    role?: string | null;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;
        console.log("credentials checked!", credentials);

        await ConnectDB(process.env.MONGO_URI!);

        const { email, password } = credentials;

        console.log("credentials destructured!", email, password);

        const user = await yusre.findOne({ email });

        if (!user) return null;

        console.log("user found!", user);

        const isMatch = await bcrypt.compare(
          password as string,
          user.password!,
        );

        if (!isMatch) return null;

        console.log("password  mathced!");
        console.log(user);

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "online",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "online",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: User;
      account?: Account | null | undefined;
    }) {
      console.log(user, "from signIn callback");
      if (account?.provider !== "github" && account?.provider !== "google")
        return true;
      //   ACCOUNT LINKING LOGIC
      await ConnectDB(process.env.MONGO_URI!);
      const existUser = await yusre.findOne({ email: user.email }); //looking for the user in the db
      if (!existUser) {
        //if the user does not exist , we create one!
        const name = user.name ?? user.email ?? "User";
        const email = user.email ?? account.providerAccountId;
        const image = user.image ?? "";

        const creatingUser = await yusre.create({
          name,
          email,
          image,
          provider: [
            {
              name: account.provider,
              providerId: account.providerAccountId,
            },
          ],
        });
        return true;
      }
      // if it does exitst we just update the new login method into database
      if (
        existUser &&
        existUser.provider.every((p: any) => p.name !== account.provider)
      ) {
        console.log("Updating user provider", account.provider);
        await yusre.updateOne(
          { _id: existUser._id },
          {
            $push: {
              provider: {
                name: account.provider,
                providerId: account.providerAccountId,
              },
            },
          },
        );
        return true;
      }
      console.log("googleProvider", existUser);

      return true;
    },
    async jwt({ token, user, account }) {
      console.log(user, "from jwt");

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
      }
      if (account?.provider === "github" || account?.provider === "google") {
        const oauthUser = await yusre.findOne({ email: token.email });

        if (oauthUser) {
          token.id = oauthUser.id;
          token.role = oauthUser.role;
        }
        console.log(token);
      }
      return token;
    },
    session({ session, token }) {
      console.log(token);
      console.log(session);

      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
});
