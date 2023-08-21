<script>
    import Toast from './Toast.svelte';
    export let toasts = [];
  </script>


<div id="toaster" class="fixed z-50 bottom-4 left-2 mx-0 my-auto">
  {#each toasts as toast (toast.id)}
    <Toast alertType={toast.alertType} message={toast.message} />
  {/each}
</div>