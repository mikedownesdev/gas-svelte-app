/**
 * @typedef {Object} PutAppConfigArgs
 * @property {AppConfiguration} appConfiguration
 */
/**
 * **API Endpoint** | Updates the app configuration and returns it
 * @param {PutAppConfigArgs} args
 * @returns {AppConfiguration | null}
 */
function putAppConfiguration({ appConfiguration }) {
  // TODO: Zod Validation of appConfiguration
  console.log("putAppConfiguration() called with: ", appConfiguration);

  //const [appConfigurationString, setAppConfigurationString] = useScriptProperty("appConfiguration")

  const propertyKey = "appConfiguration";
  const scriptPropertiesService = PropertiesService.getScriptProperties();

  scriptPropertiesService.setProperty(
    propertyKey,
    JSON.stringify(appConfiguration)
  );

  return appConfiguration;
}
