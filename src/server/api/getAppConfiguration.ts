import {
  AppConfigurationType,
  AppConfiguration,
  UserType,
  User,
} from "../../types/schemas";

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

/**
 * Loads the app configuration from the script properties
 * @returns {AppConfiguration | null}
 */
function loadAppConfiguration_(): AppConfigurationType | null {
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const scriptProperties = scriptPropertiesService.getProperties();
  const appConfigurationString = scriptProperties.appConfiguration || null;

  if (!appConfigurationString) {
    return null;
  }

  let appConfig: AppConfigurationType = {
    ...JSON.parse(appConfigurationString),
    admins: getAdmins(),
  };

  AppConfiguration.parse(appConfig);

  return appConfig;

  function getAdmins(): UserType[] {
    // Return variable
    let adminUsers = [];

    // Load all of the script properties as an object
    const scriptProperties =
      PropertiesService.getScriptProperties().getProperties();

    // Loop through script properties object
    for (const property in scriptProperties) {
      try {
        // Weed out properties that do not reprsent users
        let user = User.parse(JSON.parse(scriptProperties[property]));

        // If the user has an admin role, add them to our list
        if (user.roles.includes("admin") || user.roles.includes("superAdmin")) {
          adminUsers.push(user);
        }
      } catch (error) {
        // Not a user, carry on
      }
    }

    return adminUsers;
  }
}
