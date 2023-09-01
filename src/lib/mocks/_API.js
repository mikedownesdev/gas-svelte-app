import { getAppConfiguration } from "./api/getAppConfiguration";
import { getViewConfiguration } from "./api/getViewConfiguration";
import { getViewData } from "./api/getViewData";
import { getUser } from "./api/getUser";
import { putUser } from "./api/putUser";
import { putAppConfiguration } from "./api/putAppConfiguration";

export default function getMocks() {
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
