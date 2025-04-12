import { createAuthClient } from "better-auth/svelte";
import { magicLinkClient } from "better-auth/client/plugins";
import { PUBLIC_BETTER_AUTH_URL } from "$env/static/public";

export const authClient = createAuthClient({
  baseURL: PUBLIC_BETTER_AUTH_URL,
  plugins: [
    magicLinkClient(),
  ]
});
