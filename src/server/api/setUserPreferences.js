/**
 * @param {UserPreferences} preferencesObject
 * @returns {UserPreferences}
 */
function setUserPreferences(preferencesObject) {

  const accessingUser = Session.getActiveUser().getEmail();

  console.log(`Updating User Preferences for ${accessingUser}`)

  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const scriptProperties = scriptPropertiesService.getProperties();
  const userPreferencesString = scriptProperties.userPreferences;

  const allUserPreferences = JSON.parse(userPreferencesString);
  allUserPreferences[accessingUser] = preferencesObject;

  scriptPropertiesService.setProperty('userPreferences', JSON.stringify(allUserPreferences));

  const result = getUserPreferences();

  return result;
}
