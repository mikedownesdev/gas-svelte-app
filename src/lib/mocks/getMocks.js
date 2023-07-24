import isJest from "../isJest";
import { viewConfigurations } from "./viewConfigurations";
import { mockData } from "./mockData";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, isJest() ? 0 : ms));
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
}



export default function getMocks(resolve) {
  return {
    async getUserPreferences() {
      await sleep(1500);
      let mockResponse = {
        firstName: "John",
        lastName: "Mock",
      };
      resolve(JSON.parse(JSON.stringify(mockResponse)));
    },

    async setUserPreferences(preferencesObject) {
      console.log("going to sleep");
      await sleep(2000);
      console.log("Saved preferences " + Array.from(arguments).toString());
      let mockResponse = preferencesObject;
      // console.log('Saved preferences ' + Array.from(arguments).toString());
      resolve(JSON.parse(JSON.stringify(mockResponse)));
    },

    getViewConfiguration(viewId) {
      console.log("getting view configuration for viewId:", viewId);
      console.log(viewConfigurations)
      let mockResponse = viewConfigurations.find((config) => config.id === viewId);
      return JSON.parse(JSON.stringify(mockResponse));
    },

    async getViewData(viewId) {
      console.log("getting view data for viewId:", viewId);
      const viewConfiguration = await this.getViewConfiguration(viewId);

      if (!viewConfiguration) {
        throw new Error("View configuration not found");
      }

      console.log("getting view data for config:", viewConfiguration);
      await sleep(2000);
      const resultSet = query(viewConfiguration);

      let mockResponse = {
        source: "mocks",
        configuration: viewConfiguration,
        data: {
          records: resultSet          
        },
      };

      resolve(JSON.parse(JSON.stringify(mockResponse)));
    },
  };
}
