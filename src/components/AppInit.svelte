<script>
    import { isLoading } from "../stores";
    import runGas from "../lib/runGas";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function initializeApp() {

        console.log("initializingApp...");

        runGas("initializeApp")
            .then((result) => {
                const toast = {
                    id: Date.now(),
                    alertType: "success",
                    message: "App initialized succesfully",
                    milliseconds: 4000,
                };

                dispatch("newToast", toast);
                dispatch("initSuccess")
            })
            .catch((err) => {
                console.log(err);

                const toast = {
                    id: Date.now(),
                    alertType: "error",
                    message: "App could not initialize. See console",
                    milliseconds: 4000,
                };

                dispatch("newToast", toast);
            })
    }
</script>

<main class="container mx-auto flex h-screen justify-center items-center">
    <div>
        <div>
            <h1>Click to initialize app</h1>
        </div>
        <div>
            <button class="btn btn-primary" on:click={initializeApp}
                >Initialize</button
            >
        </div>
    </div>
</main>
