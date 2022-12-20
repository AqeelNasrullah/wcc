export const app = {
  firstName: process.env.NEXT_PUBLIC_APP_FIRST_NAME,
  lastName: process.env.NEXT_PUBLIC_APP_LAST_NAME,
};

export const keys = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  googleClientId: process.env.NEXT_PUBLIC_G_CLIENT_ID,
  googleClientSecret: process.env.NEXT_PUBLIC_G_CLIENT_SECRET,
};

export const db = {
  protocol: process.env.NEXT_PUBLIC_DB_PROTOCOL,
  host: process.env.NEXT_PUBLIC_DB_HOST,
  port: process.env.NEXT_PUBLIC_DB_PORT,
  name: process.env.NEXT_PUBLIC_DB_NAME,
};
