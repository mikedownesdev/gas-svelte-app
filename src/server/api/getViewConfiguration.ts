import { ViewConfigurationType } from "../../types/schemas";

export type GetViewConfigArgs = {
  id: string;
};

/**
 * **API Endpoint** | Returns the accessing users preferences
 * @param {GetViewConfigArgs} args
 * @returns {ViewConfiguration}
 */
export function getViewConfiguration({
  id,
}: GetViewConfigArgs): ViewConfigurationType {
  console.log("getting view configuration for viewId:", id);
  // Check user identity for permissions to view this configuration

  //
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const scriptProperties = scriptPropertiesService.getProperties();
  const appConfigurationString = scriptProperties.appConfiguration;

  if (!appConfigurationString) {
    throw new Error("App configuration not found");
  }

  /** @type {AppConfiguration} */
  const appConfigurationObject = JSON.parse(appConfigurationString);

  const viewConfiguration = appConfigurationObject.viewConfigurations.find(
    (config: ViewConfigurationType) => config.id === id
  );

  return viewConfiguration;
}
