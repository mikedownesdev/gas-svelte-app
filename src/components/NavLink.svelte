<script>
    import { link } from "svelte-routing";

    export let to = "";
    export let onClick = () => {};
</script>

<li>
    <a href={to} use:link on:click={onClick}>
        <slot />
    </a>
</li>
