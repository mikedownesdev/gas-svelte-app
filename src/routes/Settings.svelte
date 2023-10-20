<script>
    import AddAdminModal from "../components/AddAdminModal.svelte";
    import Panel from "../components/Panel.svelte";
    import RemoveAdminModal from "../components/RemoveAdminModal.svelte";
    import { isLoading, appConfiguration, sessionUser } from "../stores";
    import { sanitizeEmail } from "../lib/sanitizeEmail";
    import { GAS_API } from "../lib/GAS_API";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    async function handleClick() {
        console.log("Button clicked!");
        await updateAppConfiguration($appConfiguration);
    }

    async function updateAppConfiguration(appConfiguration) {
        isLoading.set(true);

        console.log("submitting app configuration update", appConfiguration);

        GAS_API.putAppConfiguration({ appConfiguration })
            .then((result) => {
                console.log("result", result);
                dispatch("newToast", {
                    id: Date.now(),
                    alertType: "success",
                    message: "App configuration updated!",
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
    {#if $appConfiguration}
        <Panel title="General">
            <button slot="button" class="btn" on:click={handleClick}>
                Save
            </button>
            <p class="text-gray-500" slot="description">
                Modify your app's settings. Remember to save!
            </p>
            <div slot="panel-content" class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">App Name</span>
                </label>
                <input
                    bind:value={$appConfiguration.appName}
                    disabled={$isLoading}
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                />
            </div>
        </Panel>

        <Panel title="Admins">
            <button
                slot="button"
                onclick="add_admin_modal.showModal()"
                disabled={!$sessionUser.roles.includes("superAdmin")}
                class="btn">Add Admin</button
            >
            <p class="text-gray-500" slot="description">
                Remember, admins have access to do some spooky stuff!
            </p>
            <div slot="panel-content">
                <div class="overflow-x-auto">
                    <table class="table">
                        <!-- head -->
                        <thead>
                            <tr>
                                <th>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each $appConfiguration.admins as admin}
                                <!-- row -->
                                <tr>
                                    <td>
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div class="avatar">
                                                <div
                                                    class="mask mask-squircle w-12 h-12"
                                                >
                                                    <img
                                                        src={admin.profile
                                                            .imageUrl}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">
                                                    {admin.email}
                                                </div>
                                                <div>
                                                    {#each admin.roles as role}
                                                        <span
                                                            class="badge badge-ghost badge-sm mr-2"
                                                            >{role}</span
                                                        >
                                                    {/each}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <th>
                                        <button
                                            onclick={`remove_admin_${sanitizeEmail(
                                                admin.email
                                            )}.showModal()`}
                                            class="btn btn-ghost btn-xs"
                                            >Remove</button
                                        >
                                        <RemoveAdminModal
                                            on:newToast
                                            user={admin}
                                        />
                                    </th>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </Panel>

        <AddAdminModal on:newToast />
    {/if}
</div>
