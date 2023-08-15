<script>
    export let title = "";
</script>

<div class="mt-8 w-full">
    <div class="flex justify-between">
        <h3 class="card-title">{title}</h3>
        <!-- <button class="btn btn-sm btn-primary rounded-md">save</button> -->
    </div>
    <div class="card mt-4 bg-base-100 p-8 border-base-300 border-2 rounded-md shadow-sm">
    <slot>

    </slot>
    </div>
</div>