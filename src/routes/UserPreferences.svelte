<script>
    import Panel from "../components/Panel.svelte";
    import { GAS_API } from "../lib/GAS_API";
    import { isLoading } from "../stores";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    /** @type {User | undefined} */
    export let user = undefined;
    let { profile, preferences } = user || {
        profile: {
            firstName: "hi",
            lastName: "",
        },
        preferences: {
            theme: "dark",
        },
    };

    async function handleClick() {
        console.log("Button clicked!");

        let result = await submitUserUpdate(user);
    }

    async function submitUserUpdate(user) {
        isLoading.set(true);

        console.log("submitting user update", user);

        GAS_API.putUser({user})
            .then((result) => {
                console.log('result', result)
                dispatch("newToast", {
                    id: Date.now(),
                    alertType: "success",
                    message: "User updated!",
                    milliseconds: 3000,
                });
            })
            .catch((err) => {
                console.error("Error submitting user change", err);
                dispatch("newToast", {
                    id: Date.now(),
                    alertType: "error",
                    message: "Your changes could not be saved",
                    milliseconds: 3000,
                });
            })
            .finally(() => {
                isLoading.set(false);
            });
    }
</script>

<div>
    <Panel title="Profile Info">
        <button on:click={handleClick} slot="button" class="btn btn-primary"
            >Save</button
        >
        <p class="text-gray-500" slot="description">
            Information in this section is displayed on your profile page.
        </p>
        <div slot="panel-content">
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">First Name</span>
                </label>
                <input
                    bind:value={profile.firstName}
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
                    bind:value={profile.lastName}
                    disabled={$isLoading}
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                />
            </div>
        </div>
    </Panel>
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
                    <span class="label-text">Theme</span>
                </label>
                <input
                    bind:value={preferences.theme}
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
