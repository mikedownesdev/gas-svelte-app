/**
 * Initialize the app
 */
function initializeApp() {

    const initializingUserEmail = Session.getActiveUser().getEmail();
    const deployingUserEmail = Session.getEffectiveUser().getEmail();

    /** @type AppConfiguration */
    let newAppConfig = {
        appName: "My App",
        deployingUserEmail: deployingUserEmail,
        viewConfigurations: [],
        dataSourceConfigurations: [],
        admins: []
    }

    // let appConfiguration = {
    //     "appName": "Mike's Test App",
    //     "initializingUserEmail": `${initializingUserEmail}`,
    //     "initializedAt": new Date().toISOString(),
    //     "deployingUserEmail": `${deployingUserEmail}`,
    //     "viewConfigurations": [
    //         {
    //             "id": "1", "label": "First View", "dataSource":
    //             {
    //                 "spreadsheetId": "1XD1RVZsXw6DLQv_ksIdzuYdHPcsbpXhml94nMAz5_vA",
    //                 "gid": "0",
    //                 "storageType": "Google Sheets",
    //                 "schema": { "fields": [] }
    //             },
    //             "pageSize": 10,
    //             "fields": [
    //                 {
    //                     "label": "Full Name",
    //                     "name": "fullName",
    //                     "type": "string", "width": 100, "format": "text", "filter": { "type": "text", "value": "" }, "sort": { "type": "text", "value": "" }
    //                 }, { "label": "Job", "name": "job", "type": "string", "width": 100, "format": "text", "filter": { "type": "text", "value": "" }, "sort": { "type": "text", "value": "" } }, { "label": "Favorite Color", "name": "favoriteColor", "type": "string", "width": 100, "format": "text", "filter": { "type": "text", "value": "" }, "sort": { "type": "text", "value": "" } }]
    //         },
    //         {
    //             "id": "2", "label": "Second View",
    //             "dataSource": {
    //                 "spreadsheetId": "1XD1RVZsXw6DLQv_ksIdzuYdHPcsbpXhml94nMAz5_vA",
    //                 "gid": "0",
    //                 "storageType": "Google Sheets",
    //                 "schema": { "fields": [] }
    //             },
    //             "pageSize": 10,
    //             "fields": [
    //                 {
    //                     "label": "Full Name", "name": "fullName", "type": "string", "width": 100, "format": "text", "filter": { "type": "text", "value": "" }, "sort": { "type": "text", "value": "" }
    //                 },
    //                 { "label": "Favorite Color", "name": "favoriteColor", "type": "string", "width": 100, "format": "text", "filter": { "type": "text", "value": "" }, "sort": { "type": "text", "value": "" } }
    //             ]
    //         }
    //     ],
    //     "dataSourceConfigurations": [
    //         {
    //             "spreadsheetId": "1XD1RVZsXw6DLQv_ksIdzuYdHPcsbpXhml94nMAz5_vA", "gid": "0", "storageType": "Google Sheets", "schema": {
    //                 "fields": [
    //                     {
    //                         "label": "Full Name",
    //                         "name": "fullName",
    //                         "type": "string"
    //                     },
    //                     {
    //                         "label": "Job",
    //                         "name": "job",
    //                         "type": "string"
    //                     },
    //                     {
    //                         "label": "Favorite Color",
    //                         "name": "favoriteColor",
    //                         "type": "string"
    //                     }
    //                 ]
    //             }
    //         }
    //     ],
    //     "admins": []
    // }

    const scriptPropertiesService = PropertiesService.getScriptProperties();
    scriptPropertiesService.setProperty("appConfiguration", JSON.stringify(newAppConfig))

    let response = { success: true };

    return JSON.parse(JSON.stringify(response));
}