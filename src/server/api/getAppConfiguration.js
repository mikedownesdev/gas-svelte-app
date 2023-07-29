/**
 * @returns {AppConfiguration | undefined}
 */
function getAppConfiguration() {
  console.log("getting app configuration");
  // Check user identity for permissions to view this configuration

  //
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const scriptProperties = scriptPropertiesService.getProperties();
  const appConfigurationString = scriptProperties.appConfiguration;

  if (!appConfigurationString) {
    throw new Error("App configuration not found");
  }

  /** @type {AppConfiguration} */
  const appConfigurationObject = JSON.parse(appConfigurationString);

  return appConfigurationObject;
}
