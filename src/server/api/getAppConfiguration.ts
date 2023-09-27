import { AppConfigurationType } from "../../types/schemas";

/**
 * **API Endpoint** | Returns the app configuration
 * @returns {AppConfiguration | null}
 */
export function getAppConfiguration(): AppConfigurationType | null {
  console.log("getting app configuration");

  const appConfigurationObject = loadAppConfiguration_();

  console.log(appConfigurationObject);

  // Do we want to filter the appConfig based on user?

  return appConfigurationObject;
}
