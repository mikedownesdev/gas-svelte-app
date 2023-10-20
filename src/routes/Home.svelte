<script>
  import { sessionUser } from "../stores.ts";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function handleClick() {
    const toast = {
      id: Date.now(),
      alertType: "info",
      message: "Hello, world!",
      milliseconds: 2000,
    };

    dispatch("newToast", toast);
  }
</script>

<div>
  <div class="flex flex-col gap-4 items-center justify-center">
    <div>
      <h1>
        Welcome
      </h1>
    </div>
    <div>
      <button on:click={handleClick} class="btn btn-primary">Hello</button>
    </div>
  </div>
</div>
