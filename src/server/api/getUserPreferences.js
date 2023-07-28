/**
 * @returns {UserPreferences | undefined}
 */
function getUserPreferences() {
  const userPropertiesService = PropertiesService.getUserProperties();
  const userProperties = userPropertiesService.getProperties();
  const preferencesString = userProperties.preferences;

  /** @type {UserPreferences} */
  const preferencesObject = preferencesString
    ? JSON.parse(preferencesString)
    : undefined;
  return preferencesObject;
}
