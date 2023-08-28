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
  
  /**
   * @typedef {Object} GAS_API_Functions
   * @property {function({ id: string }): Promise<any>} getViewData
   * @property {function(): Promise<any>} getAppConfiguration
   */
  
  /** @type {GAS_API_Functions} */
  export const GAS_API = {
    /**
     * @param {{ id: string }} args
     * @returns {Promise<any>}
     */
    getViewData: (args) => callAPI('getViewData', [args.id]),
  
    /**
     * @returns {Promise<any>}
     */
    getAppConfiguration: () => callAPI('getAppConfiguration'),
    // Add more methods here
  };
  