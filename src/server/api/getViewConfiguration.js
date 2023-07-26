
/**
 * 
 */
function getViewConfiguration(viewId) {
    console.log("getting view configuration for viewId:", viewId);
    // Check user identity for permissions to view this configuration

    // 
    const scriptPropertiesService = PropertiesService.getScriptProperties();
    const scriptProperties = scriptPropertiesService.getProperties();
    const appConfigurationString = scriptProperties.appConfiguration;
    const appConfigurationObject = appConfigurationString ? JSON.parse(appConfigurationString) : { views: [], dataSources: []};
    const viewConfiguration = appConfigurationObject.views.find((config) => config.id === viewId);
    return viewConfiguration;
  }