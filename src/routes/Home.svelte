<script>
  import { sessionUser } from "../stores";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function handleClick() {

    const toast = {
      id: Date.now(),
      alertType: 'info',
      message: 'Hello, world!',
      milliseconds: 2000
    };

    dispatch("newToast", toast)
  }

</script>

<div>
  <h1>Welcome Back, {$sessionUser?.preferences?.firstName}</h1>

  <div class="flex flex-wrap gap-4 justify-center">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            /></svg
          >
        </div>
        <div class="stat-title">Total Likes</div>
        <div class="stat-value text-primary">25.6K</div>
        <div class="stat-desc">21% more than last month</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            /></svg
          >
        </div>
        <div class="stat-title">Page Views</div>
        <div class="stat-value text-secondary">2.6M</div>
        <div class="stat-desc">21% more than last month</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <div class="avatar online">
            <div class="w-16 rounded-full">
              <img src={$sessionUser?.profileImgUrl} />
            </div>
          </div>
        </div>
        <div class="stat-value">86%</div>
        <div class="stat-title">Tasks done</div>
        <div class="stat-desc text-secondary">31 tasks remaining</div>
      </div>
    </div>

    <div class="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src="http://via.placeholder.com/640x360" alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Card</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button on:click={handleClick} class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>

    <div class="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src="http://via.placeholder.com/640x360" alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Compact Card</h2>
        <p>This card has less padding</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>

    <div class="card w-96 bg-base-300 shadow-xl">
      <figure>
        <img src="http://via.placeholder.com/640x360" alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          Card with Badge
          <div class="badge badge-secondary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline">Fashion</div>
          <div class="badge badge-outline">Products</div>
        </div>
      </div>
    </div>

    <div class="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
        <img src="http://via.placeholder.com/640x360" alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Card with image overlay</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>

    <div class="card w-96 bg-neutral text-neutral-content">
      <div class="card-body items-center text-center">
        <h2 class="card-title">Cookies!</h2>
        <p>We are using cookies for no reason.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Accept</button>
          <button class="btn btn-ghost">Deny</button>
        </div>
      </div>
    </div>

    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="card-actions justify-end">
          <button class="btn btn-square btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              /></svg
            >
          </button>
        </div>
        <p>We are using cookies for no reason.</p>
      </div>
    </div>

    <div class="card w-96 glass">
      <figure>
        <img src="http://via.placeholder.com/640x360" alt="car!" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Life hack</h2>
        <p>How to park your car at your garage?</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Learn now!</button>
        </div>
      </div>
    </div>

    <div class="card card-side bg-base-100 shadow-xl">
      <figure>
        <img src="http://via.placeholder.com/180x360" alt="Movie" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">New movie is released!</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>

    <div class="card lg:card-side bg-base-300 shadow-xl">
      <figure>
        <img src="http://via.placeholder.com/360x360" alt="Album" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">New album is released!</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  </div>
</div>
