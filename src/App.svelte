<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte"; 
  import Settings from "./pages/Settings.svelte"

  export let url = "/";
</script>

<Router {url}>
  <nav>
      <Link to="/">Home</Link>
      <Link to="/settings">Settings</Link>
  </nav>
  <div>
      <Route path="/"><Home /></Route>
      <Route path="/settings"><Settings /></Route>
  </div>
</Router>