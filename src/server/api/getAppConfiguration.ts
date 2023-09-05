import { AppConfigurationType } from "../../types/schemas";

/**
 * **API Endpoint** | Returns the app configuration
 * @returns {AppConfiguration | null}
 */
function getAppConfiguration(): AppConfigurationType {
  console.log("getting app configuration");

  /** @type {AppConfiguration} */
  const appConfigurationObject = loadAppConfiguration_();

  console.log(appConfigurationObject);

  // Do we want to filter the appConfig based on user?

  return appConfigurationObject;
}

/** @returns {AppConfiguration | null} */
function loadAppConfiguration_() {
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const scriptProperties = scriptPropertiesService.getProperties();
  const appConfigurationString = scriptProperties.appConfiguration || null;

  return JSON.parse(appConfigurationString);
}