import sleep from "../sleep";
import { viewConfigurations } from "../data/viewConfigurations";

/**
 * @param {GetViewConfigArgs} args
 * @returns {Promise<ViewConfiguration>}
 */
export async function getViewConfiguration({ id }) {
  console.log("getting view configuration for viewId:", id);
  await sleep();

  /** @type {ViewConfiguration} */
  let mockResponse = viewConfigurations.find((config) => config.id === id);

  return JSON.parse(JSON.stringify(mockResponse));
}
