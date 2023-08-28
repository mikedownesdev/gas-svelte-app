/**
 * Generic function to handle API calls
 * @param {string} functionName
 * @param {any[]} [args=[]] - Optional arguments
 * @returns {Promise<any>}
 */
const callAPI = async (functionName, args = []) => {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      [functionName](...args);
  });
};

export const GAS_API = {
  /**
   * @returns {Promise<AppConfiguration>} the app configuration
   */
  getAppConfiguration: () => callAPI("getAppConfiguration"),

  /**
   * @returns {Promise<User>}
   */
  getUser: () => callAPI("getUser"),

  /**
   * @returns {Promise<UserPreferences>}
   */
  getUserPreferences: () => callAPI("getUserPreferences"),

  /**
   * @param {GetViewConfigArgs} args
   * @returns {Promise<ViewConfiguration>}
   */
  getViewConfiguration: (args) => callAPI("getViewConfiguration", [args]),

  /**
   * @param {GetViewDataArgs} args
   * @returns {Promise<View>}
   */
  getViewData: (args) => callAPI("getViewData", [args]),

  /**
   *
   * @param {SetUserPreferencesArgs} args
   * @returns {Promise<UserPreferences>} the updated user preferences
   */
  setUserPreferences: (args) => callAPI("setUserPreferences", [args]),
};
