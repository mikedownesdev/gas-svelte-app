<script>
    import Toast from './Toast.svelte';
    export let toasts = [];
  
    function showToast(message) {
      const id = Date.now(); // Unique ID for each toast
      toasts = [...toasts, { id, message }];
      
      // Optionally, you can set a timeout to auto-hide the toast after a certain time
      setTimeout(() => {
        toasts = toasts.filter(toast => toast.id !== id);
      }, 3000); // 3 seconds
    }
  </script>


<div id="toaster" class="fixed z-50 bottom-0 mx-0 my-auto">
  {#each toasts as toast (toast.id)}
    <Toast alertType={toast.alertType} message={toast.message} />
  {/each}
</div>