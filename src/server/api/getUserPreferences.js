/**
 * @returns {UserPreferences | Object}
 */
function getUserPreferences() {
  
  const accessingUser = Session.getActiveUser().getEmail();
  
  console.log(`getting User Preferences for ${accessingUser}`)

  /** @type {UserPreferences} */
  const userPreferences = loadPreferencesForUser_(accessingUser);

  return userPreferences || { firstName: "", lastName: ""};
}

/**
 * @param {string} email
 * @returns {UserPreferences | undefined}
 */
function loadPreferencesForUser_(email) {
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const scriptProperties = scriptPropertiesService.getProperties();
  const userPreferencesString = scriptProperties.userPreferences;

  if (!userPreferencesString) {
    throw new Error('No user preferences found');
  }

  const allUserPreferences = JSON.parse(userPreferencesString);
  const userPreferences = allUserPreferences[email];

  return userPreferences;
}
