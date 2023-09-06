<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let nodeRef;

    /**
     * Animate the toasty message using tailwindcss animation classes
     */
    function toastsAnimation(element) {
        setTimeout(() => {
            // Remove class 'hidden' from the toasty element
            element.classList.remove("scale-0");
            // Add class 'animate' to the toasty element
            element.classList.add("scale-100");
        }, 200);
    }

    function moveProgressBar(element, duration) {
        const target = element;
        let width = 1;
        let id = setInterval(frame, duration);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                target.classList.add("scale-0");
                setTimeout(() => {
                    target.remove();
                }, 200);
            } else {
                width++;
                // get the progress bar element using the class
                const progressBar = target.querySelector(".progress");
                if (progressBar) {
                    progressBar.value = width;
                } else {
                    clearInterval(id);
                }
            }
        }
    }

    function removeWindToast(element) {
        const target = element.target;
        // Get target parent element
        const parent =
            target.parentElement.parentElement.parentElement.parentElement
                .parentElement;
        parent.remove();
    }

    const removeToast = () => {nodeRef.parentNode.removeChild(nodeRef)}

    onMount(() => {
        moveProgressBar;
    });

    export let alertType = ""; // info, warning, success, error
    export let message = "";
</script>

<div
    bind:this={nodeRef}
    in:fade={{ delay: 100, duration: 100 }}
    out:fade={{ duration: 100 }}
    class="px-3 py-2 block transform transition-all duration-150 ease-out scale-100 min-w-[200px]"
>
    <div class={`alert alert-${alertType} shadow-lg bg-base`}>
        <div class="flex flex-row items-center">
            {#if alertType == "info"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                    />
                </svg>
            {:else if alertType == "warning"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            {:else if alertType == "success"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                </svg>
            {:else if alertType == "error"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            {/if}
        </div>
        <div>
            <div>{message}</div>
            <!-- <div>
                <progress
                    class="progress progress-accent w-full"
                    value="50"
                    max="100"
                />
            </div> -->
        </div>
        <div>
            <button
                class="btn btn-neutral opacity-60 btn-sm btn-circle"
                on:click={removeToast}
            >
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
    </div>
</div>

<style>
    /*
    .alert-info {}
    .alert-warning {}
    .alert-success {}
    .alert-error {}
    */
</style>
