import sleep from "../sleep";
import { appConfiguration } from "../data/appConfiguration";

/**
 * @returns {Promise<AppConfiguration>} the app configuration
 */
export async function getAppConfiguration() {
  sleep();

  /** @type {AppConfiguration} */
  let mockResponse = appConfiguration;

  console.log("mockResponse", mockResponse);

  return JSON.parse(JSON.stringify(mockResponse));
}
