<script>
    import LoadingSpinner from "../components/LoadingSpinner.svelte";
    import runGas from "../lib/runGas.js";
    
    export let id;

    let loading = false;
    let viewData = undefined;

    // const viewConfiguration = {
    //     spreadsheetId: '1XD1RVZsXw6DLQv_ksIdzuYdHPcsbpXhml94nMAz5_vA',
    //     gid: '0',
    //     datasourceType: 'Google Sheets',
    //     pageSize: 10,
    //     columns: [
    //         {
    //             label: 'Full Name',
    //             name: 'fullName',
    //             type: 'string',
    //             width: 100,
    //             format: 'text',
    //             filter: {
    //                 type: 'text',
    //                 value: '',
    //             },
    //             sort: {
    //                 type: 'text',
    //                 value: '',
    //             },
    //         },
    //         {
    //             label: 'Job',
    //             name: 'job',
    //             type: 'string',
    //             width: 100,
    //             format: 'text',
    //             filter: {
    //                 type: 'text',
    //                 value: '',
    //             },
    //             sort: {
    //                 type: 'text',
    //                 value: '',
    //             },
    //         },
    //         {
    //             label: 'Favorite Color',
    //             name: 'favoriteColor',
    //             type: 'string',
    //             width: 100,
    //             format: 'text',
    //             filter: {
    //                 type: 'text',
    //                 value: '',
    //             },
    //             sort: {
    //                 type: 'text',
    //                 value: '',
    //             },
    //         },
    //     ],
    // }

    async function fetchViewData() {
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

    fetchViewData();

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
            
            {#each viewData.data.records as record}
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
