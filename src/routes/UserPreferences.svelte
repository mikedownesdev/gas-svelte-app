<script>
    import LoadingSpinner from "../components/LoadingSpinner.svelte";
    import runGas from "../lib/runGas.js";

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
                lastName: userPreferences.lastName
            };
            userPreferences = await submitUserPreferences(preferencesObject);
        } catch (err) {
            console.error('handleClick completed with error', err);
        }
    }

    async function submitUserPreferences(preferencesObject) {
        loading = true;

        console.log('submitting user preferences...', preferencesObject)
        
        runGas('setUserPreferences', [preferencesObject])
            .then((result) => {
                userPreferences = result;
                console.log('User preferences:', userPreferences);
            })
            .catch((err) => {
                console.error('Error submitting user preferences', err);
            })
            .finally(() => {
                console.log('User preferences submitted.');
                loading = false;
            });
    }

    async function fetchUserPreferences() {
        loading = true;
        
        console.log('fetching user preferences...')
        
        runGas('getUserPreferences')
            .then((result) => {
                userPreferences = result;
                console.log('User preferences:', userPreferences);
            })
            .catch((err) => {
                console.error('Could not get user preferences:', err);
            })
            .finally(() => {
                console.log('User preferences loaded.');
                loading = false;
            });
    }

    if (!userPreferences) { fetchUserPreferences(); }
</script>

<div>
    <div class="card bg-base-300 shadow-xl">
        {#if loading}
            <LoadingSpinner />
        {/if}
        {#if userPreferences}
        <div class="card-body">
            <h2 class="card-title">User Preferences for {userPreferences?.firstName} {userPreferences?.lastName}</h2>
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
                    >Save</button>
            </div>
        </div>
        {/if}
    </div>
</div>
