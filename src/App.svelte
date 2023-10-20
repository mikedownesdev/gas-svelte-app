<script>
  import { Route, Router } from "svelte-routing";
  import NavLink from "./components/NavLink.svelte";
  import ProtectedRoute from "./components/ProtectedRoute.svelte";
  import InitialLoad from "./components/InitialLoad.svelte";
  import View from "./routes/View.svelte";
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte";
  import UserPreferences from "./routes/UserPreferences.svelte";
  import Profile from "./routes/Profile.svelte";
  import HeaderBar from "./components/HeaderBar.svelte";
  import Toaster from "./components/Toaster.svelte";
  import { onMount } from "svelte";
  import {
    sessionUser,
    isLoading,
    appConfiguration,
    userIsAdmin,
  } from "./stores";
  import { GAS_API } from "./lib/GAS_API";
  import { fetchAppConfiguration } from "./lib/fetchAppConfig";

  /**
   *
   * @param event
   * @property {string} event.detail.alertType
   * @property {string} event.detail.message
   * @property {number} event.detail.time
   */
  function handleNewToast(event) {
    console.log(event.detail);
    toasts = [...toasts, event.detail];
    setTimeout(() => {
      toasts = toasts.filter((toast) => toast.id !== event.detail.id);
    }, event.detail.milliseconds);
  }

  $: initialLoadComplete = $sessionUser && $appConfiguration;

  let isDrawerOpen = false;
  const toggleDrawer = () => {
    isDrawerOpen = !isDrawerOpen;
  };

  let toasts = [];

  onMount(() => {
    fetchUser();
    fetchAppConfiguration();
  });

  /**
   * Fetches the user from the server.
   */
  async function fetchUser() {
    isLoading.set(true);

    console.log("fetching user...");

    GAS_API.getUser()
      .then((result) => {
        sessionUser.set(result);
        console.log("User:", result);
      })
      .catch((err) => {
        console.error("Could not get user:", err);
      })
      .finally(() => {
        console.log("User loaded.");
        isLoading.set(false);
      });
  }
</script>

<Router>
  {#if !initialLoadComplete}
    <InitialLoad />
  {:else}
    <div class="drawer min-h-screen">
      <input
        id="nav-drawer-control"
        type="checkbox"
        class="drawer-toggle"
        checked={isDrawerOpen}
        on:change={toggleDrawer}
      />
      <div class="drawer-content bg-base-200">
        <!-- Page content here -->
        <HeaderBar title={$appConfiguration?.appName} />
        <main class="container mx-auto pb-8">
          <Route path="/">
            <Home on:newToast={handleNewToast} />
          </Route>
          <ProtectedRoute path="settings">
            <Settings {$appConfiguration} on:newToast={handleNewToast} />
          </ProtectedRoute>
          <Route path="user-preferences">
            <UserPreferences user={$sessionUser} on:newToast={handleNewToast} />
          </Route>
          <Route path="view/:id" let:params>
            <View id={params.id} />
          </Route>
          <Route path="user/:email" let:params>
            <Profile email={params.email} />
          </Route>
        </main>
      </div>
      <div class="drawer-side">
        <!-- Sidebar content here -->
        <label for="nav-drawer-control" class="drawer-overlay" />
        <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content pt-16">
          <NavLink to="/" onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </NavLink>

          {#if $userIsAdmin}
            <NavLink to="/settings" onClick={toggleDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </NavLink>
          {/if}
          <NavLink to="/user-preferences" onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            User Preferences
          </NavLink>
          <div class="divider" />
        </ul>
      </div>
    </div>
  {/if}
</Router>
<Toaster {toasts} />
