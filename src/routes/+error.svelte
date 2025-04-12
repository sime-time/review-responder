<script>
  import { page } from "$app/state";
  import { TriangleAlert } from "lucide-svelte";
</script>

<div
  class="flex flex-col items-center justify-center w-screen h-screen text-center"
>
  <h1 class="text-3xl font-bold">Something went wrong</h1>
  <p class="my-4 text-lg font-medium text-error flex flex-col items-center">
    {page.status}: {page.error?.message}
    {#if page.error}
      <TriangleAlert class="size-8" />
    {/if}
  </p>
  <a class="btn btn-primary" href="/">Back to home</a>
</div>
