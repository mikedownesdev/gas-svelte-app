<script>
    export let title = "My App";
    import Footer from "../components/Footer.svelte";
</script>

<div id="nav">

</div>
<header>
    <h1>{title}</h1>
</header>

<main>
    <slot />
</main>

<Footer />

<style>
    /* Styles for the layout component */
    main {
        background-color: #bbb;
    }
</style>
