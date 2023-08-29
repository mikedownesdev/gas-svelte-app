import { getAppConfiguration } from "./api/getAppConfiguration";
import { getViewConfiguration } from "./api/getViewConfiguration";
import { getViewData } from "./api/getViewData";
import { getUser } from "./api/getUser";
import { getUserPreferences } from "./api/getUserPreferences";
import { setUserPreferences } from "./api/setUserPreferences";

export default function getMocks() {
  return {
    // App Configuration
    getAppConfiguration,

    // User
    getUser,

    // User Preferences
    getUserPreferences,
    setUserPreferences,

    // Views
    getViewConfiguration,
    getViewData,

    // /*========* App Configuration API *========*/
    // async initializeApp() {
    //   await sleep();

    //   let mockResponse = { success: true };

    //   return JSON.parse(JSON.stringify(mockResponse));
    // },
  };
}
