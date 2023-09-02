<script>
    import Panel from "../components/Panel.svelte";
    import { GAS_API } from "../lib/GAS_API";
    import { isLoading } from "../stores";

    /** @type {string} id - comes from URL params */
    export let id;

    /** @type {boolean} */
    let loading = false;

    /** @type {View} */
    let viewData = undefined;

    // viewData is fetched and persisted when the id prop changes
    $: fetchViewData(id);

    /**
     * Fetches the view data from the server.
     * @param {string} id
     */
    async function fetchViewData(id) {
        isLoading.set(true);

        console.log("fetching view data...");

        GAS_API.getViewData({id})
            .then((result) => {
                viewData = result;
                console.log("View data:", viewData);
            })
            .catch((err) => {
                console.error("Could not get view data:", err);
            })
            .finally(() => {
                console.log("View data loaded.");
                isLoading.set(false);
            });
    }
</script>

<Panel title={`View #${id}`}>
    <div slot="panel-content" class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th />
                    {#if viewData}
                    {#each viewData.configuration.fields as field}
                        <th id="#field-{field.name}">{field.label}</th>
                    {/each}
                    {/if}
                </tr>
            </thead>
            <tbody>
                {#if viewData}
                {#each viewData?.queryResult.records as record}
                    <tr>
                        <th>X</th>
                        {#each viewData?.configuration.fields as field}
                            <td>{record[field.name]}</td>
                        {/each}
                    </tr>
                {/each}
                {/if}
            </tbody>
        </table>
    </div>
</Panel>
