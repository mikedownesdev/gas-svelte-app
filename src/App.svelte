<script>
  import { Route, Router } from "svelte-routing";
  import NavLink from "./components/NavLink.svelte";
  import ProtectedRoute from "./components/ProtectedRoute.svelte";
  import Blog from "./routes/Blog.svelte";
  import View from "./routes/View.svelte";
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte";
  import UserPreferences from "./routes/UserPreferences.svelte";
  import Profile from "./routes/Profile.svelte";
  import HeaderBar from "./components/HeaderBar.svelte";
  import Toaster from "./components/Toaster.svelte";
  import runGas from "./lib/runGas";
  import { onMount } from "svelte";
  import { sessionUser } from "./stores";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";

  let toasts = [];

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

  /** @type {boolean} */
  let loading = false;

  /** @type {AppConfiguration | undefined} */
  let appConfiguration = undefined;

  /** @type {User | undefined} */
  let user = undefined;

  let isDrawerOpen = false;
  const toggleDrawer = () => {
    isDrawerOpen = !isDrawerOpen;
  };

  onMount(() => {
    fetchUser();
    fetchAppConfiguration();
  });

  /**
   * Fetches the user from the server.
   */
  async function fetchUser() {
    loading = true;

    console.log("fetching user...");

    runGas("getUser")
      .then((result) => {
        // user = result;
        sessionUser.set(result);
        console.log("User:", result);
      })
      .catch((err) => {
        console.error("Could not get user:", err);
      })
      .finally(() => {
        console.log("User loaded.");
        loading = false;
      });
  }

  /**
   * Fetches the app configuration from the server.
   */
  async function fetchAppConfiguration() {
    loading = true;

    console.log("fetching app configuration...");

    runGas("getAppConfiguration")
      .then((result) => {
        appConfiguration = result;
        console.log("App configuration:", appConfiguration);
      })
      .catch((err) => {
        console.error("Could not get app configuration:", err);
      })
      .finally(() => {
        console.log("App configuration loaded.");
        loading = false;
      });
  }
</script>

<Router {url}>
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
      <HeaderBar title={appConfiguration?.appName} />
      <main class="container mx-auto pb-8">
        <Route path="/">
          <Home on:newToast={handleNewToast} />
        </Route>
        <ProtectedRoute path="settings">
          <Settings {appConfiguration} />
        </ProtectedRoute>
        <Route path="user-preferences">
          <UserPreferences
            userPreferences={$sessionUser.preferences}
            on:newToast={handleNewToast}
          />
        </Route>
        <Route path="blog">
          <Blog />
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

        <NavLink to="/settings" onClick={toggleDrawer}>Settings</NavLink>
        <NavLink to="/user-preferences" onClick={toggleDrawer}
          >User Preferences</NavLink
        >
        <NavLink to="/blog" onClick={toggleDrawer}>Blog</NavLink>
        <div class="divider" />
        {#if appConfiguration}
          {#each appConfiguration?.viewConfigurations as view}
            <NavLink to="view/{view.id}" onClick={toggleDrawer}>{view.label}</NavLink>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
  <Toaster {toasts} />
</Router>
