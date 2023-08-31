import sleep from "../sleep";

/**
 * @param {PutAppConfigArgs} args
 * @returns {Promise<AppConfiguration | null>}
 */
export async function putAppConfiguration({ appConfiguration }) {
  await sleep();

  /** @type {AppConfiguration} */
  let mockResponse = appConfiguration;

  return JSON.parse(JSON.stringify(mockResponse));
}
