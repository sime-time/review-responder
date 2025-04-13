<script lang="ts">
  import { authClient } from "$lib/auth-client";

  let email = $state<string>("");
  let sent = $state<boolean>(false);

  const emailMagicLink = async (e: Event) => {
    e.preventDefault();
    const { data, error } = await authClient.signIn.magicLink({
      email: email,
      callbackURL: "/review-responder",
    });
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      sent = true;
    }
  };
</script>

<div class="flex flex-col items-center justify-center w-screen h-screen gap-2">
  <h1 class="text-2xl font-bold">Free Review Responder</h1>
  <form
    onsubmit={(e: Event) => emailMagicLink(e)}
    class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box"
  >
    {#if sent && email}
      <p class="text-success text-lg">
        Click the link sent to your email: {email}
      </p>
    {:else}
      <label class="fieldset-label" for="email">Email</label>
      <input
        name="email"
        type="email"
        id="email"
        value={email}
        oninput={(event) => {
          email = event.currentTarget.value;
        }}
        class="input validator"
        placeholder="johnsmith@email.com"
        required
      />
      <button type="submit" class="btn btn-neutral mt-4">Submit</button>
    {/if}
  </form>
</div>
