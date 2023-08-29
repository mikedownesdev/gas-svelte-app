import sleep from "../sleep";
import { user } from "../data/user";

/**
 * @returns {Promise<UserPreferences>}
 */
export async function getUserPreferences() {
  await sleep();

  /** @type {UserPreferences} */
  let mockResponse = user.preferences;

  return JSON.parse(JSON.stringify(mockResponse));
}
