import { AppConfigurationType } from "../../types/schemas";

/**
 * Initialize the app
 */
export function initializeApp_(): Object {
  const ENV = {
    executeAs: "USER_DEPLOYING", // "USER_DEPLOYING" | "USER_ACCESSING"
  };

  let superAdminEmail: string = "";
  if (ENV.executeAs === "USER_DEPLOYING") {
    superAdminEmail = Session.getEffectiveUser().getEmail();
  } else if (ENV.executeAs === "USER_ACCESSING") {
    superAdminEmail = DriveApp.getFileById(ScriptApp.getScriptId())
      .getOwner()
      .getEmail();
  } else {
    throw `App could not be initialized`;
  }

  const deployingUserEmail = Session.getEffectiveUser().getEmail();

  createUser_(superAdminEmail, { roles: ["superAdmin"] });

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

  let appConfig = loadAppConfiguration_();

  return JSON.parse(JSON.stringify(appConfig));
}
