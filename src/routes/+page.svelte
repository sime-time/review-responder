<script lang="ts">
  import { authClient } from "$lib/auth-client";

  let email = $state("");

  const sendMagicLink = async (e: Event) => {
    e.preventDefault();
    console.log("email:", email);
    const { data, error } = await authClient.signIn.magicLink({
      email: email,
      callbackURL: "/review-responder",
    });
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  };
</script>

<div class="flex flex-col items-center justify-center w-screen h-screen gap-2">
  <h1 class="text-2xl font-bold">Free Review Responder</h1>
  <fieldset
    class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box"
  >
    <label class="fieldset-label" for="email">Email</label>
    <input
      name="email"
      type="email"
      id="email"
      value={email}
      oninput={(event) => {
        email = event.currentTarget.value;
      }}
      class="input"
      placeholder="johnsmith@email.com"
    />
    <button
      onclick={(e: Event) => sendMagicLink(e)}
      class="btn btn-neutral mt-4">Submit</button
    >
  </fieldset>
</div>
