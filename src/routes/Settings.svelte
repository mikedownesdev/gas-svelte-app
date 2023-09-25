<script>
    import AddAdminModal from "../components/AddAdminModal.svelte";
    import Panel from "../components/Panel.svelte";
    import { isLoading, appConfiguration } from "../stores";
</script>

<div>
    {#if $appConfiguration}
        <Panel title="General">
            <button slot="button" class="btn">Save</button>
            <p class="text-gray-500" slot="description">
                This is my slotted description
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
            <button slot="button" onclick="admin_modal.showModal()" class="btn"
                >Add Admin</button
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
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            class="checkbox"
                                        />
                                    </label>
                                </th>
                                <th>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each $appConfiguration.admins as admin}
                                <!-- row -->
                                <tr>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                class="checkbox"
                                            />
                                        </label>
                                    </th>
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
                                        <button class="btn btn-ghost btn-xs"
                                            >details</button
                                        >
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
