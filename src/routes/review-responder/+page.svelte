<script lang="ts">
  interface Review {
    id: number;
    text: string;
    rating: number;
    source: string;
  }

  type ResponseType = "friendly" | "professional" | "custom";

  let name = $state<string>("");
  let review = $state<string>("");
  let tone = $state<ResponseType>("friendly");
  let customTonePrompt = $state<string>("");
  let generatedResponse = $state<string>("");
  let isGenerating = $state<boolean>(false);

  // generate response based on selected tone
  async function generateResponse(): Promise<void> {
    isGenerating = true;
    generatedResponse = "booty";
    isGenerating = false;
  }

  function copyToClipboard(): void {
    navigator.clipboard.writeText(generatedResponse);
  }

  $effect(() => {
    $inspect(name);
    $inspect(review);
    $inspect(customTonePrompt);
  });
</script>

<div class="max-w-4xl mx-auto p-4 mb-4">
  <h1 class="text-3xl font-bold mb-6 text-neutral">AI Review Responder</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-2">
    <!-- Review Section -->
    <div class="flex flex-col gap-3">
      <fieldset class="fieldset">
        <legend class="fieldset-legend text-lg font-medium">Review</legend>
        <textarea
          class="textarea h-24"
          placeholder="Insert review here..."
          value={review}
          oninput={(event) => {
            review = event.currentTarget.value;
          }}
        ></textarea>
      </fieldset>

      <div class="rating rating-xl">
        <input
          type="radio"
          name="star-rating"
          class="mask mask-star-2 bg-orange-400"
          aria-label="1 star"
          checked={true}
        />
        <input
          type="radio"
          name="star-rating"
          class="mask mask-star-2 bg-orange-400"
          aria-label="2 star"
        />
        <input
          type="radio"
          name="star-rating"
          class="mask mask-star-2 bg-orange-400"
          aria-label="3 star"
        />
        <input
          type="radio"
          name="star-rating"
          class="mask mask-star-2 bg-orange-400"
          aria-label="4 star"
        />
        <input
          type="radio"
          name="star-rating"
          class="mask mask-star-2 bg-orange-400"
          aria-label="5 star"
        />
      </div>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-lg font-medium">Name</legend>
        <input
          type="text"
          class="input"
          placeholder="Karen"
          value={name}
          oninput={(event) => {
            name = event.currentTarget.value;
          }}
        />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-lg font-medium">Tone</legend>
        <div class="flex gap-2 text-base">
          <button
            class="px-3 py-1 border rounded-field {tone === 'friendly'
              ? 'bg-secondary/20 border-secondary'
              : 'border-neutral-300'}"
            onclick={() => {
              tone = "friendly";
            }}
          >
            Friendly
          </button>

          <button
            class="px-3 py-1 border rounded-field {tone === 'professional'
              ? 'bg-secondary/20 border-secondary'
              : 'border-neutral-300'}"
            onclick={() => {
              tone = "professional";
            }}
          >
            Professional
          </button>

          <button
            class="px-3 py-1 border rounded-field {tone === 'custom'
              ? 'bg-secondary/20 border-secondary'
              : 'border-neutral-300'}"
            onclick={() => {
              tone = "custom";
            }}
          >
            Custom
          </button>
        </div>
      </fieldset>
      {#if tone === "custom"}
        <div>
          <textarea
            value={customTonePrompt}
            class="textarea"
            placeholder="Warm, energetic, and charming..."
            oninput={(event) => {
              customTonePrompt = event.currentTarget.value;
            }}
          ></textarea>
        </div>
      {/if}
    </div>

    <!-- Response Section -->
    <div class="flex flex-col gap-3">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-medium">Generated Response</h2>
        <button
          class="btn btn-secondary btn-soft btn-xs"
          onclick={copyToClipboard}
          disabled={!generatedResponse}
        >
          Copy
        </button>
      </div>

      <textarea
        class="textarea h-48 w-full"
        value={generatedResponse}
        onchange={(event) => {
          generatedResponse = event.currentTarget.value;
        }}
        hidden={!generatedResponse}
      ></textarea>

      <button
        class="btn btn-secondary btn-block"
        onclick={generateResponse}
        disabled={isGenerating}
      >
        Get New Response
      </button>
    </div>
  </div>
</div>
