<script>
    import { isLoading } from "../stores";
    import Modal from "./Modal.svelte";
    import { GAS_API } from "../lib/GAS_API";
    import { fetchAppConfiguration } from "../lib/fetchAppConfig";
    import UserSelect from "./UserSelect.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let selectedUsersFromChild = [];

    function handleNewAdminSubmit() {
        // TODO: validate input
        let user = selectedUsersFromChild[0];
        console.log("raising user to admin status", user);

        isLoading.set(true);

        user = { ...user, roles: [...user.roles, "admin"] };

        GAS_API.putUser({ user })
            .then(async (result) => {
                console.log("New admin added:", result);
                await fetchAppConfiguration();

                dispatch("newToast", {
                    id: Date.now(),
                    alertType: "success",
                    message: "Admin added!",
                    milliseconds: 3000,
                });
            })
            .catch((err) => {
                console.error("Could not add new admin:", err);
                dispatch("newToast", {
                    id: Date.now(),
                    alertType: "error",
                    message: "Your changes could not be saved",
                    milliseconds: 3000,
                });
            })
            .finally(() => {
                isLoading.set(false);
            });
    }
</script>

<Modal id="add_admin_modal" title="Add Admin">
    <div slot="modal-content">
        <p class="py-4">Select a user to make an admin</p>
        <UserSelect on:update={(e) => (selectedUsersFromChild = e.detail)} />
    </div>
    <button
        slot="modal-action"
        on:click={handleNewAdminSubmit}
        disabled={selectedUsersFromChild.length === 0}
        class="btn">Submit</button
    >
</Modal>
