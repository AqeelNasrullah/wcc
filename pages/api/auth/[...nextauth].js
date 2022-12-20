import NextAuth from "next-auth";
import { keys } from "utils/config";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import "utils/db";
import User from "models/user";
import { verifyPassword } from "utils/helpers";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize({ username, password }) {
        const user = await User.findOne({ username });
        if (user) {
          const passVerified = await verifyPassword(user.password, password);
          if (passVerified) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.verified = user.verified;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.isAdmin = token.isAdmin;
        session.verified = token.verified;
      }

      return session;
    },
    signIn: async ({ account, profile, user }) => {
      if (account.provider === "google") {
        const userData = await User.findOne({ email: profile?.email });

        if (userData) {
          user.id = userData._id;
          user.isAdmin = userData.isAdmin;
          user.verified = userData.verified;
        } else {
          try {
            const userDataNew = await User.create({
              image: profile?.picture,
              name: profile?.name,
              username: profile?.email.split("@")[0],
              email: profile?.email,
              verified: profile?.email_verified,
            });

            user.id = userDataNew._id;
            user.isAdmin = userDataNew.isAdmin;
            user.verified = userDataNew.verified;
          } catch (error) {
            console.log("SignIn Callback Error: ", error);
          }
        }
      }

      return true;
    },
  },
  secret: keys.secret,
  pages: {
    signIn: "login",
  },
});
