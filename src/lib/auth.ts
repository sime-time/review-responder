import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./server/drizzle/db";
import * as authSchema from "./server/drizzle/schema/auth-schema";
import { magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: false
  },
  /*
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {

      },
    }),
  ],
  */
});
