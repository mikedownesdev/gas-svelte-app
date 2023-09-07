<script>
    import { Route } from 'svelte-routing';
    import PageNotFound from '../routes/404.svelte'
    import { sessionUser } from '../stores';
    
    $: isAuthenticated = $sessionUser?.roles?.includes('admin');

    export let path;
    
</script>

{#if isAuthenticated}
    <Route path={path}>
        <slot>

        </slot>
    </Route>
{:else}
    <Route path={path}>
        <PageNotFound />
    </Route>
{/if}