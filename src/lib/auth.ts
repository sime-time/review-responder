import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./server/drizzle/db";
import * as authSchema from "./server/drizzle/schema/auth-schema";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";
import { RESEND_KEY } from "$env/static/private";

const resend = new Resend(RESEND_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: false
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const { data, error } = await resend.emails.send({
          from: "Simeon <support@webundance.com>",
          to: [email],
          subject: "Magic Link",
          html: `<strong>It works! See where this goes.</strong>\n
          <p><a href="${url}">${url}</a></p>`
        });

        if (error) {
          console.error(error);
        } else {
          console.log(data);
        }
      },
      disableSignUp: false,
    }),
  ],
});
