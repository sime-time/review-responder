<script lang="ts">
  type ResponseType = "friendly" | "professional" | "custom";

  let name = $state<string>("");
  let review = $state<string>("");
  let rating = $state<number>(1);
  let tone = $state<ResponseType>("friendly");
  let customTonePrompt = $state<string>("");
  let reviewResponse = $state<string>("");

  // generate response to review
  async function handleGeneration(): Promise<void> {
    if (!name || !review || !rating || !tone) {
      reviewResponse = "Please insert a review, name, and tone.";
      return console.error("Invalid inputs for review");
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review,
          name,
          rating,
          ton: tone == "custom" ? customTonePrompt : tone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate response");
      }
      console.log(data.response.text);
      reviewResponse = data.response.text;
    } catch (err) {
      console.error("Error:", err);
      reviewResponse = "Failed to generate response. Please try again.";
    }
  }

  function copyToClipboard(): void {
    navigator.clipboard.writeText(reviewResponse);
  }

  $effect(() => {
    $inspect(name);
    $inspect(review);
    $inspect(rating);
    $inspect(reviewResponse);
    $inspect(customTonePrompt);
  });
</script>

<div class="max-w-4xl mx-auto p-4 mb-4">
  <h1 class="text-3xl font-bold mb-6 text-neutral">AI Review Responder</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Review -->
    <div class="flex flex-col gap-3">
      <fieldset class="fieldset">
        <legend class="fieldset-legend text-lg font-medium">Review</legend>
        <textarea
          class="textarea h-24 w-full"
          placeholder="Insert review here..."
          value={review}
          oninput={(event) => {
            review = event.currentTarget.value;
          }}
        ></textarea>
      </fieldset>

      <!-- Rating -->
      <div class="rating rating-xl">
        {#each [1, 2, 3, 4, 5] as value}
          <input
            type="radio"
            name="star-rating"
            class="mask mask-star-2 bg-orange-400"
            aria-label="{value} star"
            checked={rating === value}
            onclick={() => {
              rating = value;
            }}
          />
        {/each}
      </div>

      <!-- Name -->
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

      <!-- Tone -->
      <fieldset class="fieldset">
        <legend class="fieldset-legend text-lg font-medium">Tone</legend>
        <div class="flex gap-2 text-base">
          {#each ["friendly", "professional", "custom"] as toneType}
            <button
              class="capitalize px-3 py-1 border rounded-field {tone == toneType
                ? 'bg-secondary/20 border-secondary'
                : 'border-neutral-300'}"
              onclick={() => {
                tone = toneType as ResponseType;
              }}
            >
              {toneType}
            </button>
          {/each}
        </div>
      </fieldset>

      <!-- Custom Tone -->
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

    <!-- Response -->
    <div class="flex flex-col gap-3">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-medium">Generated Response</h2>
        <button
          class="btn btn-secondary btn-soft btn-xs"
          onclick={() => copyToClipboard()}
          disabled={!reviewResponse}
        >
          Copy
        </button>
      </div>

      <textarea
        class="textarea h-48 w-full"
        bind:value={reviewResponse}
        hidden={!reviewResponse}
      ></textarea>

      <button
        class="btn btn-secondary btn-block"
        onclick={() => handleGeneration()}
      >
        Get New Response
      </button>
    </div>
  </div>
</div>
