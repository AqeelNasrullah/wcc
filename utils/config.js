export const app = {
  firstName: process.env.NEXT_PUBLIC_APP_FIRST_NAME,
  lastName: process.env.NEXT_PUBLIC_APP_LAST_NAME,
  appUrlDev: process.env.NEXT_PUBLIC_APP_URL_DEV,
  appUrlStaging: process.env.NEXT_PUBLIC_APP_URL_STAGING,
  appUrlProduction: process.env.NEXT_PUBLIC_APP_URL_PROD,
};

export const assets = {
  avatar:
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
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

export const mail = {
  username: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
  password: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  port: process.env.NEXT_PUBLIC_EMAIL_PORT,
  service: process.env.NEXT_PUBLIC_EMAIL_SERVICE,
  host: process.env.NEXT_PUBLIC_EMAIL_HOST,
};
