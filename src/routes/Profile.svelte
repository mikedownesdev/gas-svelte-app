<script>
    import Panel from "../components/Panel.svelte";
    import { GAS_API } from "../lib/GAS_API";
    import { isLoading } from "../stores";

    /** @type {string} id - comes from URL params */
    export let email;

    /** @type {boolean} */
    let loading = false;

    /** @type {User | undefined} */
    let user = undefined;

    // Fetch the user on mount
    $: fetchUser(email);

    /**
     * Fetches the requested user from the server.
     * @param {string} email
     */
    async function fetchUser(email) {
        isLoading.set(true)

        console.log("fetching user data for profile...");

        GAS_API.getUser({ email })
            .then((result) => {
                user = result;
                console.log("User data:", user);
            })
            .catch((err) => {
                console.error("Could not get user data:", err);
            })
            .finally(() => {
                console.log("User data loaded.");
                isLoading.set(false)
            });
    }
</script>

{#if user && !loading}
    <!-- <div class="flex flex-col items-center border-2">
        <div class="avatar online mb-4">
            <div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-">
              <img src={user.profileImgUrl} />
            </div>
        </div>
        <div>
            <h2 class="card-title">{user.preferences.firstName} {user.preferences.lastName}</h2>
        </div>
            <span>{user.email}@email.com</span>
        </div> -->
    <div class="flex flex-row">
        <div class="flex flex-col py-2 px-12">
            <div class="avatar mb-4">
                <div
                    class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1"
                >
                    <img src={user.profile.imageUrl} alt="The user"/>
                </div>
            </div>
            <div class="py-1">
                <h2 class="card-title">
                    {user.profile.firstName}
                    {user.profile.lastName}
                </h2>
            </div>
            <div class="py-1">
                <span>{user.email}</span>
            </div>
            <div class="py-1">
                {#each user.roles as role}
                    <span class="badge">{role.toUpperCase()}</span>
                {/each}
            </div>
        </div>
        <div class="flex flex-col flex-grow items-center">
            <div class="stats w-full shadow">
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
                    <div class="stat-value">86%</div>
                    <div class="stat-title">Tasks done</div>
                    <div class="stat-desc text-secondary">
                        31 tasks remaining
                    </div>
                </div>
            </div>
            <Panel title="Recent Activity">
                <div slot="panel-content" class="overflow-x-auto">
                    <table class="table">
                        <!-- head -->
                        <thead>
                            <tr>
                                <th>
                                    Label
                                </th>
                                <th>
                                    Value
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each user.activity as record}
                                <tr>
                                    <td>{record.label}</td>
                                    <td>{record.value}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </Panel>
        </div>
    </div>
{/if}
