import "./app.css";
import App from "./App.svelte";

document.getElementById("app-title").innerHTML = "Svelte App";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
