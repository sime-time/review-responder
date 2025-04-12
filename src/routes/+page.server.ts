import { auth } from "$lib/auth";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // redirect to review-responder if user session already exists
  if (session) {
    throw redirect(307, "/review-responder");
  }
}
