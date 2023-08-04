<script>
    import LoadingSpinner from "../components/LoadingSpinner.svelte";
    import Panel from "../components/Panel.svelte";
    import runGas from "../lib/runGas.js";
    import { isLoading } from "../stores";

    /** @type {boolean} */
    let loading = false;

    /** @type {UserPreferences | undefined} */
    export let userPreferences = undefined;

    async function handleClick() {
        // Function to be triggered when the button is clicked
        console.log("Button clicked!");
        // You can perform any other actions here
        try {
            let preferencesObject = {
                firstName: userPreferences.firstName,
                lastName: userPreferences.lastName,
            };
            userPreferences = await submitUserPreferences(preferencesObject);
        } catch (err) {
            console.error("handleClick completed with error", err);
        }
    }

    async function submitUserPreferences(preferencesObject) {
        isLoading.set(true);

        console.log("submitting user preferences...", preferencesObject);

        runGas("setUserPreferences", [preferencesObject])
            .then((result) => {
                userPreferences = result;
                console.log("User preferences:", userPreferences);
            })
            .catch((err) => {
                console.error("Error submitting user preferences", err);
            })
            .finally(() => {
                console.log("User preferences submitted.");
                isLoading.set(false)
            });
    }

    async function fetchUserPreferences() {
        isLoading.set(true)

        console.log("fetching user preferences...");

        runGas("getUserPreferences")
            .then((result) => {
                userPreferences = result;
                console.log("User preferences:", userPreferences);
            })
            .catch((err) => {
                console.error("Could not get user preferences:", err);
            })
            .finally(() => {
                console.log("User preferences loaded.");
                isLoading.set(false)
            });
    }

    if (!userPreferences) {
        fetchUserPreferences();
    }
</script>

<div>
    {#if userPreferences}
        <Panel title="User Preferences">
            <p class="text-gray-500">
                Modify your user preferences here. Remember to save!
            </p>
            <div class="divider" />
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">First Name</span>
                </label>
                <input
                    bind:value={userPreferences.firstName}
                    disabled={loading}
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Last Name</span>
                </label>
                <input
                    bind:value={userPreferences.lastName}
                    disabled={loading}
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                />
            </div>
            <div class="card-actions justify-end">
                <button on:click={handleClick} class="btn btn-primary"
                    >Save</button
                >
            </div>
        </Panel>
    {/if}
</div>
