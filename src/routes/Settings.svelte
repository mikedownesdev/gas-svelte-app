<script>
    import { Link } from "svelte-routing";
    import LoadingSpinner from "../components/LoadingSpinner.svelte";
    import runGas from "../lib/runGas.js";
    import Modal from "../components/Modal.svelte";

    /** @type {boolean} */
    let loading = false;

    /** @type {AppConfiguration} */
    let appConfiguration = undefined;

    fetchAppConfiguration();

    /**
     * Fetches the app configuration from the server.
     */
    async function fetchAppConfiguration() {
        loading = true;

        console.log("fetching app configuration...");

        runGas("getAppConfiguration")
            .then((result) => {
                appConfiguration = result;
                console.log("App configuration:", appConfiguration);
            })
            .catch((err) => {
                console.error("Could not get app configuration:", err);
            })
            .finally(() => {
                console.log("App configuration loaded.");
                loading = false;
            });
    }
</script>

<div>
    <div class="card bg-base-300 shadow-xl">
        {#if loading}
            <LoadingSpinner />
        {/if}
        {#if appConfiguration}
            <div class="card-body">
                <h2 class="card-title">Settings</h2>
                <p class="text-gray-500">Configure the app</p>
                <div class="divider" />
                <section>
                    <div>
                        <h3 class="card-title">Users</h3>
                    </div>
                    <div>
                        <p>
                            <span>Deployer & Super Admin:</span>
                            {appConfiguration.deployingUserEmail}
                        </p>
                    </div>
                </section>
                <div class="divider" />
                <section>
                    <div>
                        <h3 class="card-title">Datasources</h3>
                    </div>
                    <div>
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
                    <div class="card-actions justify-start">
                        <button
                            class="btn btn-primary"
                            onclick="addDatasourceModal.showModal()"
                            >Add Datasource
                        </button>
                        <Modal id="addDatasourceModal" />
                    </div>
                </section>
                <div class="divider" />
                <section>
                    <div>
                        <h3 class="card-title">Views</h3>
                    </div>
                    <div>
                        <ul class="menu">
                            {#each appConfiguration.viewConfigurations as viewConfiguration}
                                <li>
                                    <p class="text-gray-500">
                                        <Link
                                            to={`view/${viewConfiguration.id}`}
                                        >
                                            <span class="link text-blue-600">
                                                {viewConfiguration.label}
                                            </span>
                                        </Link>
                                        ({viewConfiguration.dataSource
                                            .spreadsheetId})
                                    </p>
                                </li>
                            {/each}
                        </ul>
                    </div>
                    <div class="card-actions justify-start">
                        <button
                            class="btn btn-primary"
                            onclick="addViewModal.showModal()"
                            >Add Datasource
                        </button>
                        <Modal id="addViewModal"/>
                    </div>
                </section>
            </div>
        {/if}
    </div>
</div>
