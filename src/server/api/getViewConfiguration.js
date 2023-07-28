/**
 * @param {string} viewId
 * @returns {ViewConfiguration | undefined}
 */
function getViewConfiguration(viewId) {
    console.log("getting view configuration for viewId:", viewId);
    // Check user identity for permissions to view this configuration

    // 
    const scriptPropertiesService = PropertiesService.getScriptProperties();
    const scriptProperties = scriptPropertiesService.getProperties();
    const appConfigurationString = scriptProperties.appConfiguration;

    if (!appConfigurationString) { throw new Error('App configuration not found'); }

    /** @type {AppConfiguration} */
    const appConfigurationObject = JSON.parse(appConfigurationString);

    const viewConfiguration = appConfigurationObject.viewConfigurations.find((config) => config.id === viewId);
    return viewConfiguration;
  }