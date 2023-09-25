import { dataSourceConfigurations } from "./dataSourceConfigurations";
import { viewConfigurations } from "./viewConfigurations";
import { user } from "./user";

export let appConfiguration = {
  appName: "Mock App",
  deployingUserEmail: user.email,
  dataSourceConfigurations,
  viewConfigurations,
};
