<script>
  import { Link, Route, Router } from "svelte-routing";
  import Blog from "./routes/Blog.svelte";
  import View from "./routes/View.svelte";
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte";
  import UserPreferences from "./routes/UserPreferences.svelte";
  import HeaderBar from "./components/HeaderBar.svelte";
  import Footer from "./components/Footer.svelte";
  import runGas from "./lib/runGas";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";

  /** @type {boolean} */
  let loading = false;

  /** @type {AppConfiguration} */
  let appConfiguration = undefined;

  fetchAppConfiguration();

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
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <HeaderBar title={appConfiguration?.appName}/>
      <main class="container mx-auto">
        <Route path="/">
          <Home />
        </Route>
        <Route path="settings">
          <Settings appConfiguration={appConfiguration}/>
        </Route>
        <Route path="user-preferences">
          <UserPreferences />
        </Route>
        <Route path="blog/*">
          <Blog />
        </Route>
        <Route path="view/:id" let:params>
          <View id={params.id} />
        </Route>
      </main>
      <Footer />
    </div>
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay" />
      <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content pt-16">
        <!-- Sidebar content here -->
        <li><Link to="/">Home</Link></li>
        <li><Link to="settings">Settings</Link></li>
        <li><Link to="user-preferences">User Preferences</Link></li>
        <li><Link to="blog">Blog</Link></li>
        <div class="divider" />
        {#if appConfiguration}
        {#each appConfiguration?.viewConfigurations as view}
          <li><Link to="view/{view.id}">{view.label}</Link></li>
        {/each}
        {/if}
      </ul>
    </div>
  </div>
</Router>
