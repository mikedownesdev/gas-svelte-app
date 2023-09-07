<script lang="ts">
    export let id: string;
    export let title: string = "";
</script>

<dialog {id} class="modal modal-bottom sm:modal-middle">
    <form method="dialog" class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >✕</button
        >
        <h3 class="font-bold text-lg">{title}</h3>
        <slot name="modal-content"/>
        <div class="modal-action">
            <!-- if there is a button in form, it will close the modal -->
            <slot name="modal-action" />
        </div>
    </form>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
