<script>
    import { isLoading } from "../stores";

    export let title = "";
</script>

<div class="mt-8 w-full">
    <div class="flex justify-between">
        <h3 class="card-title">{title}</h3>
        <slot name="button" />
    </div>
    <div class="card mt-4 bg-base-100 p-8 border-base-300 border-2 rounded-md shadow-sm">
        {#if $isLoading}
            <div
                class="absolute w-full bg-base-300 opacity-50 h-full top-0 left-0"
            />
        {/if}
        <slot class="text-base-200" name="description" />
        <div class="divider" />
        <div class="panel-content">
            <slot name="panel-content"/>
        </div>
    </div>
</div>
