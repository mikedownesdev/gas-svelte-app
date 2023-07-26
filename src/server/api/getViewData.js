function getViewData(viewId) {
    
    const viewConfiguration = getViewConfiguration(viewId);

    if (!viewConfiguration) {
        throw new Error("View configuration not found");
    }

    console.log("getting view data for config:", viewConfiguration);
    const resultSet = query(viewConfiguration);

    let mockResponse = {
        source: "gas",
        configuration: viewConfiguration,
        data: {
            records: resultSet
        },
    };

    return mockResponse
}