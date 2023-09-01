import polyfillScriptRun from "./polyfillScriptRun";
polyfillScriptRun();

/**
 * Generic function to handle API calls
 * @param {string} functionName
 * @param {any} [args=[]] - Optional arguments
 * @returns {Promise<any>}
 */
const callAPI = async (functionName, args = []) => {
  console.log("calling api", functionName, args);
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      [functionName](...(Array.isArray(args) ? args : [args]));
  });
};

export const GAS_API = {
  /**
   * @returns {Promise<AppConfiguration>} the app configuration
   */
  getAppConfiguration: () => callAPI("getAppConfiguration"),

  /**
   * @param {PutAppConfigArgs} args
   * @returns {Promise<AppConfiguration>} the app configuration
   */
  putAppConfiguration: (args) => callAPI("putAppConfiguration", args),

  /**
   * @param {GetUserArgs} [args] - Optional parameter containing user email
   * @returns {Promise<User>}
   */
  getUser: (args) => callAPI("getUser", args),

  /**
   *
   * @param {PutUserArgs} args
   * @returns {Promise<User>}
   */
  putUser: (args) => callAPI("putUser", args),

  /**
   * @param {GetViewConfigArgs} args
   * @returns {Promise<ViewConfiguration>}
   */
  getViewConfiguration: (args) => callAPI("getViewConfiguration", args),

  /**
   * @param {GetViewDataArgs} args
   * @returns {Promise<View>}
   */
  getViewData: (args) => callAPI("getViewData", args),
};
