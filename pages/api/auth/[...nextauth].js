import NextAuth from "next-auth";
import { keys } from "utils/config";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    CredentialsProvider({
      authorize(credentials) {
        if (
          credentials.username === "admin" &&
          credentials.password === "password"
        ) {
          return {
            id: 2,
            name: "Aqeel Nasrullah",
            email: "aqeelnasrullah1997@gmail.com",
            image: "https://via.placeholder.com/50x50",
            role: "admin",
          };
        }
        return null;
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
        token.role = user.role;
        token.verified = user.emailVerified;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.role = token.role;
        session.verified = token.verified;
      }

      return session;
    },
    signIn: ({ account, profile, user }) => {
      if (account.provider === "google") {
        user.role = "admin";
        user.emailVerified = profile?.email_verified;
        console.log("SignIn CallBack => ", profile);
      }

      return true;
    },
  },
  secret: keys.secret,
  pages: {
    signIn: "login",
  },
});
