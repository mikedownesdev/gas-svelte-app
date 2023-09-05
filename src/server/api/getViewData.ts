import { ViewType } from "../../types/schemas";

export type GetViewDataArgs = {
  id: string;
};

import { getViewConfiguration } from "./getViewConfiguration";

/**
 * **API Endpoint** | Returns the data for the view with the provided id
 * @param {GetViewDataArgs} args
 * @returns {View}
 */
function getViewData({ id }: GetViewDataArgs): ViewType {
  const viewConfiguration = getViewConfiguration({ id });

  if (!viewConfiguration) {
    throw new Error("View configuration not found");
  }

  console.log(
    "Found config, reading dataSource and applying view schema:",
    viewConfiguration
  );

  const queryResult = query(viewConfiguration);

  let response = {
    source: "gas",
    configuration: viewConfiguration,
    queryResult: queryResult,
  };

  return response;
}
