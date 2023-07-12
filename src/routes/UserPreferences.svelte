<script>
    import runGas from "../lib/runGas.js";
    async function handleClick() {
        // Function to be triggered when the button is clicked
        console.log("Button clicked!");
        // You can perform any other actions here
        try {
            console.log('Getting user preferences...')
            let userPreferences = await runGas('getUserPreferences');
            console.log(userPreferences)
        } catch (err) {
            console.error('Could not get user preferences:', err);
        }
    }
</script>

<div>
    <div class="card bg-base-300 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">User Preferences</h2>
            <p class="text-gray-500">
                Modify your user preferences here. Remember to save!
            </p>
            <div class="divider" />
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">First Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Last Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                />
            </div>
            <div class="card-actions justify-end">
                <button on:click={handleClick} class="btn btn-primary"
                    >Save</button
                >
            </div>
        </div>
    </div>
</div>
