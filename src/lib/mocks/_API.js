import isJest from "../isJest";
import { viewConfigurations } from "./viewConfigurations";
import { user, users } from "./user";
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
    async initializeApp() {
      await sleep();

      let mockResponse = { success: true };

      resolve(JSON.parse(JSON.stringify(mockResponse)));
    },

    /*========* App Configuration API *========*/
    /**
     * @returns {Promise<AppConfiguration>} the app configuration
     */
    async getAppConfiguration() {
      await sleep();

      /** @type {AppConfiguration} */
      let mockResponse = appConfiguration;

      return JSON.parse(JSON.stringify(mockResponse));
    },

    /*========* User Preferences API *========*/
    /**
     * @returns {Promise<UserPreferences>}
     */
    async getUserPreferences() {
      await sleep();

      /** @type {UserPreferences} */
      let mockResponse = user.preferences;

      return JSON.parse(JSON.stringify(mockResponse));
    },

    /**
     * @param {SetUserPreferencesArgs} args
     * @returns {Promise<UserPreferences>}
     */
    async setUserPreferences({ preferencesObject }) {
      await sleep();

      /** @type {UserPreferences} */
      let mockResponse = preferencesObject;

      return JSON.parse(JSON.stringify(mockResponse));
    },

    /*========* View Configuration API *========*/
    /**
     * @param {GetViewConfigArgs} args
     * @returns {Promise<ViewConfiguration>}
     */
    async getViewConfiguration({ id }) {
      console.log("getting view configuration for viewId:", id);
      await sleep();

      /** @type {ViewConfiguration} */
      let mockResponse = viewConfigurations.find((config) => config.id === id);
      
      return JSON.parse(JSON.stringify(mockResponse));
    },
    /*========* View Data API *========*/
    /**
     * 
     * @param {GetViewDataArgs} args
     * @returns {Promise<View>}
     */
    async getViewData({ id }) {
      console.log("getting view data for viewId:", id);
      const viewConfiguration = await this.getViewConfiguration({ id });

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

      return JSON.parse(JSON.stringify(mockResponse));
    },

    /*========* Users API *========*/
    /**
     * @param {GetUserArgs} args
     * @returns {Promise<User>}
     */
    async getUser({email}) {
      await sleep(1000);

      /** @type {User | undefined} */
      let mockResponse = undefined;

      if (!email) {
        mockResponse = user;
      } else {
        mockResponse = users.find((user) => user.email === email);
      }

      console.log("mockResponse", mockResponse);

      return JSON.parse(JSON.stringify(mockResponse));
    },
  };
}
