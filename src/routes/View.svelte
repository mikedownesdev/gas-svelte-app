<script>
    import LoadingSpinner from "../components/LoadingSpinner.svelte";
    import runGas from "../lib/runGas.js";
    
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
        loading = true;
        
        console.log('fetching view data...')
        
        runGas('getViewData', [id])
            .then((result) => {
                viewData = result;
                console.log('View data:', viewData);
            })
            .catch((err) => {
                console.error('Could not get view data:', err);
            })
            .finally(() => {
                console.log('View data loaded.');
                loading = false;
            });
    }
</script>

<h1>View #{id}</h1>
{#if loading}
    <LoadingSpinner />
{/if}
{#if viewData}
<div class="overflow-x-auto">
    <table class="table">
        <!-- head -->
        <thead>
            <tr>
                <th />
                {#each viewData.configuration.fields as field}
                <th id="#field-{field.name}">{field.label}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            
            {#each viewData.queryResult.records as record}
            <tr>
                <th>X</th>
                {#each viewData.configuration.fields as field}
                <td>{record[field.name]}</td>
                {/each}
            </tr>
            {/each}
            
        </tbody>
    </table>
</div>
{/if}