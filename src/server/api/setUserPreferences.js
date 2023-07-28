/**
 * @param {UserPreferences} preferencesObject
 * @returns {UserPreferences}
 */
function setUserPreferences(preferencesObject) {

    const userPropertiesService = PropertiesService.getUserProperties();
    const updatedPreferencesString = JSON.stringify(preferencesObject)
    
    userPropertiesService.setProperties({
        preferences: updatedPreferencesString
    })

    const result = getUserPreferences();
    
    return result
}