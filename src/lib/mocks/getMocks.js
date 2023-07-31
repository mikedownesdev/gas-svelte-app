import isJest from "../isJest";
import { viewConfigurations } from "./viewConfigurations";
import { dataSourceConfigurations } from "./dataSourceConfigurations";
import { appConfiguration } from "./appConfiguration";
import { mockData } from "./mockData";

function sleep(ms) {
  let milliseconds = ms || Math.floor(Math.random() * 2001) + 1000;
  return new Promise((resolve) =>
    setTimeout(resolve, isJest() ? 0 : milliseconds)
  );
}

const query = (viewConfiguration) => {
  const { spreadsheetId, gid } = viewConfiguration.dataSource;
  const { fields } = viewConfiguration;
  const { records } = mockData[spreadsheetId];
  const data = records.map((record) => {
    return fields.reduce((acc, column) => {
      acc[column.name] = record[column.name];
      return acc;
    }, {});
  });
  return data;
};

export default function getMocks(resolve) {
  return {
    /*========* App Configuration API *========*/

    async getAppConfiguration() {
      await sleep(100);

      /** @type {AppConfiguration} */
      let mockResponse = appConfiguration;

      resolve(JSON.parse(JSON.stringify(mockResponse)));
    },

    /*========* User Preferences API *========*/

    async getUserPreferences() {
      await sleep(1500);

      /** @type {UserPreferences} */
      let mockResponse = {
        firstName: "John",
        lastName: "Mock",
      };
      resolve(JSON.parse(JSON.stringify(mockResponse)));
    },

    async setUserPreferences(preferencesObject) {
      await sleep(2000);
      console.log("Saved preferences " + Array.from(arguments).toString());

      /** @type {UserPreferences} */
      let mockResponse = preferencesObject;
      resolve(JSON.parse(JSON.stringify(mockResponse)));
    },

    /*========* View Configuration API *========*/

    getViewConfiguration(viewId) {
      console.log("getting view configuration for viewId:", viewId);
      let mockResponse = viewConfigurations.find(
        (config) => config.id === viewId
      );
      return JSON.parse(JSON.stringify(mockResponse));
    },

    async postViewConfiguration(viewConfiguration) {
      console.log("posting view configuration:", viewConfiguration);
      await sleep(2000);
      let mockResponse = viewConfiguration;
      return JSON.parse(JSON.stringify(mockResponse));
    },

    putViewConfiguration(viewConfiguration) {
      return true;
    },

    deleteViewConfiguration(viewId) {
      return true;
    },

    /*========* View Data API *========*/

    async getViewData(viewId) {
      console.log("getting view data for viewId:", viewId);
      const viewConfiguration = await this.getViewConfiguration(viewId);

      if (!viewConfiguration) {
        throw new Error("View configuration not found");
      }

      console.log("getting view data for config:", viewConfiguration);
      await sleep(2000);
      const resultSet = query(viewConfiguration);

      /** @type {View} */
      let mockResponse = {
        source: "mocks",
        configuration: viewConfiguration,
        queryResult: {
          producedAt: new Date().toISOString(),
          records: resultSet,
        },
      };

      resolve(JSON.parse(JSON.stringify(mockResponse)));
    },
  };
}
