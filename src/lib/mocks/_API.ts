import { getAppConfiguration } from "./api/getAppConfiguration";
import { getViewConfiguration } from "./api/getViewConfiguration";
import { getViewData } from "./api/getViewData";
import { getUser } from "./api/getUser";
import { putUser } from "./api/putUser";
import { putAppConfiguration } from "./api/putAppConfiguration";

type MockEndpoints = {
  // App Configuration
  getAppConfiguration: typeof getAppConfiguration;
  putAppConfiguration: typeof putAppConfiguration;

  // User
  getUser: typeof getUser;
  putUser: typeof putUser;

  // Views
  getViewConfiguration: typeof getViewConfiguration;
  getViewData: typeof getViewData;
};

export default function getMockEndpoints(): MockEndpoints {
  return {
    // App Configuration
    getAppConfiguration,
    putAppConfiguration,

    // User
    getUser,
    putUser,

    // Views
    getViewConfiguration,
    getViewData,
  };
}
