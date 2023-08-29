<script>
    import Panel from "../components/Panel.svelte";
    import { GAS_API } from "../lib/GAS_API";
    import runGas from "../lib/runGas.js";
    import { isLoading } from "../stores";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    /** @type {UserPreferences | undefined} */
    export let userPreferences = { firstName: "test", lastName: "test" };

    async function handleClick() {
        // Function to be triggered when the button is clicked
        console.log("Button clicked!");
        // You can perform any other actions here
        try {
            let preferencesObject = {
                firstName: userPreferences.firstName,
                lastName: userPreferences.lastName,
            };
            await submitUserPreferences(preferencesObject);
        } catch (err) {
            console.error("handleClick completed with error", err);
        }
    }

    async function submitUserPreferences(preferencesObject) {
        isLoading.set(true);

        console.log("submitting user preferences...", preferencesObject);

        GAS_API.setUserPreferences({ preferencesObject })
            .then((result) => {
                userPreferences = result;
                console.log("User preferences:", userPreferences);
                dispatch("newToast", {
                    id: Date.now(),
                    alertType: "success",
                    message: "User preferences saved!",
                    milliseconds: 3000,
                });
            })
            .catch((err) => {
                console.error("Error submitting user preferences", err);
                dispatch("newToast", {
                    id: Date.now(),
                    alertType: "error",
                    message: "Your preferences could not be saved.",
                    milliseconds: 3000,
                });
            })
            .finally(() => {
                isLoading.set(false);
            });
    }

    async function fetchUserPreferences() {
        isLoading.set(true);

        console.log("fetching user preferences...");

        GAS_API.getUserPreferences()
            .then((result) => {
                userPreferences = result;
                console.log("User preferences:", userPreferences);
            })
            .catch((err) => {
                console.error("Could not get user preferences:", err);
            })
            .finally(() => {
                console.log("User preferences loaded.");
                isLoading.set(false);
            });
    }

    if (!userPreferences) {
        fetchUserPreferences();
    }
</script>

<div>
    <!-- {#if userPreferences} -->
    <Panel title="User Preferences">
        <button on:click={handleClick} slot="button" class="btn btn-primary"
            >Save</button
        >
        <p class="text-gray-500" slot="description">
            Modify your user preferences here. Remember to save!
        </p>
        <div slot="panel-content">
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">First Name</span>
                </label>
                <input
                    value={userPreferences.firstName}
                    disabled={$isLoading}
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
                    value={userPreferences.lastName}
                    disabled={$isLoading}
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                />
            </div>
        </div>
        <div class="card-actions justify-end" />
    </Panel>
    <!-- {/if} -->
</div>
