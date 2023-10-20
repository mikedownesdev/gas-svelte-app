import { isLoading, appConfiguration } from "../stores";
import { GAS_API } from "./GAS_API";

/**
 * Fetches the app configuration from the server.
 */
export async function fetchAppConfiguration() {
  isLoading.set(true);

  console.log("fetching app configuration...");

  GAS_API.getAppConfiguration()
    .then((result) => {
      appConfiguration.set(result);
    })
    .catch((err) => {
      console.error("Could not get app configuration:", err);
    })
    .finally(() => {
      console.log("App configuration loaded.");
      isLoading.set(false);
    });
}
