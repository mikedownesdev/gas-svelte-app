/**
 * 
 */
function setUserPreferences(preferencesObject) {
    
    if (!preferencesObject.firstName || !preferencesObject.lastName) {
        throw new Error('First name and last name are required');
    }

    const userPropertiesService = PropertiesService.getUserProperties();
    const updatedPreferencesString = JSON.stringify(preferencesObject)
    
    userPropertiesService.setProperties({
        preferences: updatedPreferencesString
    })
    
    return getUserPreferences();
}