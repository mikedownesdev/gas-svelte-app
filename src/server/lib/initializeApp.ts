import { AppConfigurationType } from "../../types/schemas";

/**
 * Initialize the app
 */
function initializeApp(): Object {
  const deployingUserEmail = Session.getEffectiveUser().getEmail();

  createUser_(deployingUserEmail);

  let newAppConfig: AppConfigurationType = {
    appName: "My App",
    deployingUserEmail: deployingUserEmail,
    viewConfigurations: [],
    dataSourceConfigurations: [],
    admins: [],
  };

  const scriptPropertiesService = PropertiesService.getScriptProperties();
  scriptPropertiesService.setProperty(
    "appConfiguration",
    JSON.stringify(newAppConfig)
  );

  let response = { success: true };

  return JSON.parse(JSON.stringify(response));
}
