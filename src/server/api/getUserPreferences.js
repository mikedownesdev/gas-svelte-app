/**
 * 
 */
function getUserPreferences() {
    const userPropertiesService = PropertiesService.getUserProperties();
    const userProperties = userPropertiesService.getProperties();
    const preferencesString = userProperties.preferences;
    const preferencesObject = preferencesString ? JSON.parse(preferencesString) : { firstName: '', lastName: '' };
    return preferencesObject;
}