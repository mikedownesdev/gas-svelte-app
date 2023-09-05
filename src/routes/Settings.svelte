<script>
    import { Link } from "svelte-routing";
    import Panel from "../components/Panel.svelte";
    import { isLoading } from "../stores";
    import Modal from "../components/Modal.svelte";
    import { GAS_API } from "../lib/GAS_API";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    /** @type {AppConfiguration} */
    export let appConfiguration;

    let newAdmin = "";

    function handleNewAdmin() {
        // TODO: validate input
        console.log("submitting new admin", newAdmin);
        // isLoading.set(true);

        appConfiguration.admins.push(newAdmin);

        console.log('sending app configuration to server...', {appConfiguration});

        GAS_API.putAppConfiguration({appConfiguration})
            .then((result) => {
                console.log("App configuration updated:", result);
                newAdmin = "";
                dispatch("newToast", {
                    id: Date.now(),
                    alertType: "success",
                    message: "App updated!",
                    milliseconds: 3000,
                });
            })
            .catch((err) => {
                console.error("Could not update app configuration:", err);
                dispatch("newToast", {
                    id: Date.now(),
                    alertType: "error",
                    message: "Your changes could not be saved",
                    milliseconds: 3000,
                });
            })
            .finally(() => {
                console.log("App configuration updated.");
                isLoading.set(false);
            });

        // GAS_API.addAdmin({ email: newAdmin })
        //     .then((result) => {
        //         console.log("New admin added:", result);
        //         newAdmin = "";
        //     })
        //     .catch((err) => {
        //         console.error("Could not add new admin:", err);
        //     })
        //     .finally(() => {
        //         console.log("New admin added.");
        //         isLoading.set(false);
        //     });
    }

    /**
     * Fetches the app configuration from the server.
     */
    async function fetchAppConfiguration() {
        isLoading.set(true);

        console.log("fetching app configuration...");

        GAS_API.getAppConfiguration()
            .then((result) => {
                appConfiguration = result;
                console.log("App configuration:", appConfiguration);
            })
            .catch((err) => {
                console.error("Could not get app configuration:", err);
            })
            .finally(() => {
                console.log("App configuration loaded.");
                isLoading.set(false);
            });
    }
</script>

<div>
    {#if appConfiguration}
        <div class="tabs">
            <a class="tab tab-lg tab-active">General</a>
            <a class="tab tab-lg">Users</a>
            <a class="tab tab-lg">Data & Views</a>
            <a class="tab tab-lg">Warnings & Errors</a>
        </div>

        <Panel title="General">
            <button slot="button" class="btn">Test</button>
            <p class="text-gray-500" slot="description">
                This is my slotted description
            </p>
            <div slot="panel-content" class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">App Name</span>
                </label>
                <input
                    bind:value={appConfiguration.appName}
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
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            <!-- row 1 -->
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
                                    <div class="flex items-center space-x-3">
                                        <div class="avatar">
                                            <div
                                                class="mask mask-squircle w-12 h-12"
                                            >
                                                <img
                                                    src="http://via.placeholder.com/48x48"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">
                                                Hart Hagerty
                                            </div>
                                            <div class="text-sm opacity-50">
                                                United States
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span class="badge badge-ghost badge-sm"
                                        >Desktop Support Technician</span
                                    >
                                </td>
                                <td>Purple</td>
                                <th>
                                    <button class="btn btn-ghost btn-xs"
                                        >details</button
                                    >
                                </th>
                            </tr>
                            <!-- row 2 -->
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
                                    <div class="flex items-center space-x-3">
                                        <div class="avatar">
                                            <div
                                                class="mask mask-squircle w-12 h-12"
                                            >
                                                <img
                                                    src="http://via.placeholder.com/48x48"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">
                                                Brice Swyre
                                            </div>
                                            <div class="text-sm opacity-50">
                                                China
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Carroll Group
                                    <br />
                                    <span class="badge badge-ghost badge-sm"
                                        >Tax Accountant</span
                                    >
                                </td>
                                <td>Red</td>
                                <th>
                                    <button class="btn btn-ghost btn-xs"
                                        >details</button
                                    >
                                </th>
                            </tr>
                            <!-- row 3 -->
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
                                    <div class="flex items-center space-x-3">
                                        <div class="avatar">
                                            <div
                                                class="mask mask-squircle w-12 h-12"
                                            >
                                                <img
                                                    src="http://via.placeholder.com/48x48"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">
                                                Marjy Ferencz
                                            </div>
                                            <div class="text-sm opacity-50">
                                                Russia
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Rowe-Schoen
                                    <br />
                                    <span class="badge badge-ghost badge-sm"
                                        >Office Assistant I</span
                                    >
                                </td>
                                <td>Crimson</td>
                                <th>
                                    <button class="btn btn-ghost btn-xs"
                                        >details</button
                                    >
                                </th>
                            </tr>
                            <!-- row 4 -->
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
                                    <div class="flex items-center space-x-3">
                                        <div class="avatar">
                                            <div
                                                class="mask mask-squircle w-12 h-12"
                                            >
                                                <img
                                                    src="http://via.placeholder.com/48x48"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">
                                                Yancy Tear
                                            </div>
                                            <div class="text-sm opacity-50">
                                                Brazil
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Wyman-Ledner
                                    <br />
                                    <span class="badge badge-ghost badge-sm"
                                        >Community Outreach Specialist</span
                                    >
                                </td>
                                <td>Indigo</td>
                                <th>
                                    <button class="btn btn-ghost btn-xs"
                                        >details</button
                                    >
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Panel>

        <Panel title="Datasources">
            <button slot="button" class="btn">Add Admin</button>
            <p class="text-gray-500" slot="description">
                Configure your datasources here
            </p>
            <div slot="panel-content">
                <ul class="menu">
                    {#each appConfiguration.dataSourceConfigurations as dataSourceConfiguration}
                        <li>
                            <a
                                href={`https://docs.google.com/spreadsheets/d/${dataSourceConfiguration.spreadsheetId}/edit#gid=${dataSourceConfiguration.gid}`}
                                target="_blank"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    ><path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    /></svg
                                >
                                {dataSourceConfiguration.spreadsheetId}edit#gid={dataSourceConfiguration.gid}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        </Panel>

        <Panel title="Views">
            <button slot="button" class="btn btn-primary">Add View</button>
            <p class="text-gray-500" slot="description">
                Manage the application's views. Each view will be added to the
                sidebar navigation
            </p>
            <div slot="panel-content">
                <ul class="menu">
                    {#each appConfiguration.viewConfigurations as viewConfiguration}
                        <li>
                            <p class="text-gray-500">
                                <Link to={`view/${viewConfiguration.id}`}>
                                    <span class="link text-blue-600">
                                        {viewConfiguration.label}
                                    </span>
                                </Link>
                                ({viewConfiguration.dataSource.spreadsheetId})
                            </p>
                        </li>
                    {/each}
                </ul>
            </div>
        </Panel>

        <Panel title="Warnings & Errors">
            <button slot="button" class="btn">Refresh</button>
            <p class="text-gray-500" slot="description">
                Configure your datasources here
            </p>
            <div slot="panel-content" />
        </Panel>

        <Modal id="admin_modal" title="Add Admin">
            <div slot="modal-content">
                <p class="py-4">Enter the new admin's email below:</p>
                <input
                    bind:value={newAdmin}
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                />
            </div>
            <button slot="modal-action" on:click={handleNewAdmin} class="btn"
                >Submit</button
            >
        </Modal>
    {/if}
</div>
