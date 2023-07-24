<script>
  import { Link, Route, Router } from "svelte-routing";
  import Blog from "./routes/Blog.svelte";
  import View from "./routes/View.svelte";
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte"
  import UserPreferences from "./routes/UserPreferences.svelte"
  import HeaderBar from "./components/HeaderBar.svelte";
  import Footer from "./components/Footer.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";


</script>

<Router {url}>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <HeaderBar />
      <main class='container mx-auto'>
        <Route path="/" >
          <Home />
        </Route>
        <Route path="settings">
          <Settings />
        </Route>
        <Route path="user-preferences">
          <UserPreferences />
        </Route>
        <Route path="blog/*">
          <Blog />
        </Route>
        <Route path="view/:id" let:params>
          <View id="{params.id}"/>
        </Route>
    </main>
    <Footer />
    </div> 
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content pt-16">
        <!-- Sidebar content here -->
        <li><Link to="/">Home</Link></li>
        <li><Link to="settings">Settings</Link></li>
        <li><Link to="user-preferences">User Preferences</Link></li>
        <div class="divider"></div>
        <li><Link to="blog">Blog</Link></li>
        <li><Link to="view/1">View 1</Link></li>
        <li><Link to="view/2">View 2</Link></li>
      </ul>
    </div>
  </div>
</Router>