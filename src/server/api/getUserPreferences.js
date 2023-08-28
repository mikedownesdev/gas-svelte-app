/**
 * **API Endpoint** | Returns the accessing users preferences
 * @returns {UserPreferences | Object}
 */
function getUserPreferences() {
  const accessingUser = Session.getActiveUser().getEmail();

  console.log(`getting User Preferences for ${accessingUser}`);

  /** @type {UserPreferences} */
  const userPreferences = loadPreferencesForUser_(accessingUser);

  return userPreferences || { firstName: "", lastName: "" };
}

/**
 * @param {string} email
 * @returns {UserPreferences | undefined}
 */
function loadPreferencesForUser_(email) {
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const scriptProperties = scriptPropertiesService.getProperties();
  let userPreferencesString = scriptProperties.userPreferences;

  if (!userPreferencesString) {
    const defaultUserPreferences = {};
    scriptPropertiesService.setProperty(
      "userPreferences",
      JSON.stringify(defaultUserPreferences)
    );
    userPreferencesString = JSON.stringify(defaultUserPreferences);
  }

  const allUserPreferences = JSON.parse(userPreferencesString);
  let userPreferences = allUserPreferences[email];

  if (!userPreferences) {
    userPreferences = {
      ...userPreferences,
      [email]: { firstName: "", lastName: "" },
    };

    scriptPropertiesService.setProperty(
      "userPreferences",
      JSON.stringify(userPreferences)
    );
  }

  return userPreferences;
}

// function useScriptProperty(key) {
//   const propertiesService = PropertiesService.getScriptProperties();
//   const properties = propertiesService.getProperty(key)
//   const keyValueString = properties[key].toString();

//   const valueToString(value) {
//     if (typeof value === "string") {
//       return value
//     }

//     if (typeof value === "object") {
//       return JSON.stringify(value)
//     }

//     if (typeof value === "number") {
//       return value.toString()
//     }

//     if (typeof value === "boolean") {
//       return value
//     }
//   }

//   const setProperties = (value) => {
//     let stringValue = valueToString(value)
//     propertiesService.setProperty(key, stringValue)
//   }

//   return []
// }

// function test() {
//   let [userPrefs, setUserPrefs] = useScriptProperty("userPreferences");
//   setUserPrefs
// }

// function usePropertiesService(propertiesService, properties) {

// }
