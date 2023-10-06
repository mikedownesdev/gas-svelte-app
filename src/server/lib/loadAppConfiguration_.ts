import { AppConfigurationType, AppConfiguration } from "../../types/schemas";

/**
 * Loads the app configuration from the script properties
 * @returns {AppConfiguration | null}
 */
const loadAppConfiguration_ = (): AppConfigurationType | null => {
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const scriptProperties = scriptPropertiesService.getProperties();
  const appConfigurationString = scriptProperties.appConfiguration || null;

  if (!appConfigurationString) {
    return null;
  }

  let appConfig: AppConfigurationType = {
    ...JSON.parse(appConfigurationString),
    admins: getAdmins_(),
  };

  AppConfiguration.parse(appConfig);

  return appConfig;
}

export {
  loadAppConfiguration_,
}