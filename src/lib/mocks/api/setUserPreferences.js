import sleep from "../sleep";

/**
 * @param {SetUserPreferencesArgs} args
 * @returns {Promise<UserPreferences>}
 */
export async function setUserPreferences({ preferencesObject }) {
  await sleep();

  /** @type {UserPreferences} */
  let mockResponse = preferencesObject;

  return JSON.parse(JSON.stringify(mockResponse));
}
