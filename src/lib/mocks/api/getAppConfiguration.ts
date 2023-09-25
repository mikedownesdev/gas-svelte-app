import sleep from "../sleep";
import { appConfiguration } from "../data/appConfiguration";
import { AppConfigurationType } from "../../../types/schemas";
import { getAdmins_ } from "../getAdmins_";

export async function getAppConfiguration(): Promise<AppConfigurationType> {
  sleep();

  let appConfig = {
    ...appConfiguration,
    admins: getAdmins_(),
  };

  let mockResponse = appConfig;

  console.log("mockResponse", mockResponse);

  return JSON.parse(JSON.stringify(mockResponse));
}
