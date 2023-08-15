/**
 * @returns {AppConfiguration | undefined}
 */
function getAppConfiguration() {
  console.log("getting app configuration");

  /** @type {AppConfiguration} */
  const appConfigurationObject = loadAppConfiguration_();

  // Do we want to filter the appConfig based on user?

  return appConfigurationObject;
}

function loadAppConfiguration_() {
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const scriptProperties = scriptPropertiesService.getProperties();
  const appConfigurationString = scriptProperties.appConfiguration;

  if (!appConfigurationString) {
    throw new Error("App configuration not found");
  }

  return JSON.parse(appConfigurationString);
}
