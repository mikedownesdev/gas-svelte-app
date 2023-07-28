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


/* * 
 */
function setViewConfiguration(viewId) {
    console.log("getting view configuration for viewId:", viewId);
    // Check user identity for permissions to set configurations

    // 
    const scriptPropertiesService = PropertiesService.getScriptProperties();
    const scriptProperties = scriptPropertiesService.getProperties();
    const appConfigurationString = scriptProperties.appConfiguration;
    const appConfigurationObject = appConfigurationString ? JSON.parse(appConfigurationString) : { views: [], dataSources: []};
    const viewConfiguration = appConfigurationObject.views.find((config) => config.id === viewId);
    return viewConfiguration;
  }