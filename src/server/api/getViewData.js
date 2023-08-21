/**
 * @param {string} viewId
 * @returns {View}
 */
function getViewData(viewId) {
  const viewConfiguration = getViewConfiguration(viewId);

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
