import sleep from "../sleep";

import { PutAppConfigArgs } from "../../../server/api/putAppConfiguration";
import { AppConfiguration, AppConfigurationType } from "../../../types/schemas";

/**
 * @param {PutAppConfigArgs} args
 * @returns {Promise<AppConfigurationType | null>}
 */
export async function putAppConfiguration({
  appConfiguration,
}: PutAppConfigArgs): Promise<AppConfigurationType | null> {
  await sleep();

  let validAppConfig = AppConfiguration.parse(appConfiguration);

  /** @type {AppConfiguration} */
  let mockResponse = validAppConfig;

  return JSON.parse(JSON.stringify(mockResponse));
}
