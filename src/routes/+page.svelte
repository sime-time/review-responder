<script lang="ts">
  import { authClient } from "$lib/auth-client";

  let email = $state<string>("");
  let sent = $state<boolean>(false);
  let buttonDisabled = $state<boolean>(false);

  const emailMagicLink = async (e: Event) => {
    e.preventDefault();
    buttonDisabled = true;
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
    buttonDisabled = false;
  };
</script>

<div class="flex flex-col items-center justify-center w-screen h-screen gap-2">
  <div class="w-5/6 md:w-1/4 2xl:w-1/5 text-sm flex flex-col gap-4 mb-4">
    <h1 class="text-2xl font-bold">Free AI Review Responder</h1>
    <p>
      This web app helps property hosts and business owners write personalized,
      professional responses to customer reviews, matching their preferred tone
      and addressing key points from each review.
    </p>
    <ul class="list-decimal ml-4">
      <li>Enter your email on the login page</li>
      <li>Receive a secure link in your email</li>
      <li>Click the link to access the app automatically</li>
      <li>No passwords to remember or manage</li>
    </ul>

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
        <button
          type="submit"
          class="btn btn-neutral mt-4"
          disabled={buttonDisabled}>Submit</button
        >
      {/if}
    </form>
  </div>
</div>
