<script lang="ts">
  interface Review {
    id: number;
    text: string;
    rating: number;
    source: string;
  }

  type ResponseType = "friendly" | "professional" | "custom";

  let generatedResponse = $state<string>("");
  let isGenerating = $state<boolean>(false);
  let responseTemplate = $state<ResponseType>("friendly");
  let customPrompt = $state<string>("");

  // generate response based on selected tone
  async function generateResponse(): Promise<void> {
    isGenerating = true;
    // ai code
    isGenerating = false;
  }

  function copyToClipboard(): void {
    navigator.clipboard.writeText(generatedResponse);
  }
</script>

<div class="max-w-4xl mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6 text-neutral">AI Review Responder</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Review Section -->
    <div class="flex flex-col gap-3">
      <fieldset class="fieldset">
        <legend class="fieldset-legend text-lg font-medium">Review</legend>
        <textarea class="textarea h-24" placeholder="Insert review here..."
        ></textarea>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-lg font-medium">Rating</legend>
        <div class="rating rating-xl">
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
            aria-label="1 star"
            checked={true}
          />
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
            aria-label="2 star"
          />
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
            aria-label="3 star"
          />
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
            aria-label="4 star"
          />
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
            aria-label="5 star"
          />
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-lg font-medium">Name</legend>
        <input type="text" class="input" placeholder="Karen" />
      </fieldset>

      <div class="mt-6">
        <h2 class="text-lg font-medium mb-2">Tone</h2>
        <div class="flex gap-2">
          <button
            class="px-3 py-1 border rounded {responseTemplate === 'friendly'
              ? 'bg-blue-100 border-blue-500'
              : 'border-gray-200'}"
            onclick={() => {
              responseTemplate = "friendly";
              generateResponse();
            }}
          >
            Friendly
          </button>
          <button
            class="px-3 py-1 border rounded {responseTemplate === 'professional'
              ? 'bg-blue-100 border-blue-500'
              : 'border-gray-200'}"
            onclick={() => {
              responseTemplate = "professional";
              generateResponse();
            }}
          >
            Professional
          </button>
          <button
            class="px-3 py-1 border rounded {responseTemplate === 'custom'
              ? 'bg-blue-100 border-blue-500'
              : 'border-gray-200'}"
            onclick={() => {
              responseTemplate = "custom";
              generateResponse();
            }}
          >
            Custom
          </button>
        </div>

        {#if responseTemplate === "custom"}
          <div class="mt-3">
            <textarea
              bind:value={customPrompt}
              class="w-full p-2 border rounded"
              rows="2"
              placeholder="Enter custom instructions..."
            ></textarea>
            <button
              class="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
              onclick={generateResponse}
            >
              Apply
            </button>
          </div>
        {/if}
      </div>
    </div>

    <!-- Response Section -->
    <div>
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-lg font-medium">Generated Response</h2>
        <button
          class="text-sm text-blue-500 flex items-center"
          onclick={copyToClipboard}
          disabled={!generatedResponse}
        >
          <span class="mr-1">Copy</span>
        </button>
      </div>

      {#if isGenerating}
        <div class="p-4 border rounded bg-gray-50 flex justify-center">
          <span>Generating...</span>
        </div>
      {:else}
        <div class="p-4 border rounded min-h-[200px]">
          <p>{generatedResponse}</p>
        </div>
      {/if}

      <button
        class="mt-3 px-3 py-2 bg-blue-500 text-white rounded w-full"
        onclick={generateResponse}
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Regenerate Response"}
      </button>
    </div>
  </div>
</div>
