import sleep from "../sleep";
import { viewConfigurations } from "../data/viewConfigurations";
import { ViewConfigurationType } from "../../../types/schemas";
import { GetViewConfigArgs } from "../../../server/api/getViewConfiguration";

export async function getViewConfiguration({
  id,
}: GetViewConfigArgs): Promise<ViewConfigurationType> {
  console.log("getting view configuration for viewId:", id);
  await sleep();

  /** @type {ViewConfiguration} */
  let mockResponse = viewConfigurations.find((config) => config.id === id);

  return JSON.parse(JSON.stringify(mockResponse));
}
