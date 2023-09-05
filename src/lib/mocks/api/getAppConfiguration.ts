import sleep from "../sleep";
import { appConfiguration } from "../data/appConfiguration";
import { AppConfigurationType } from "../../../types/schemas";

export async function getAppConfiguration(): Promise<AppConfigurationType> {
  sleep();

  /** @type {AppConfiguration} */
  let mockResponse = appConfiguration;

  console.log("mockResponse", mockResponse);

  return JSON.parse(JSON.stringify(mockResponse));
}
