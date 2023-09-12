import { dataSourceConfigurations } from "./dataSourceConfigurations";
import { viewConfigurations } from "./viewConfigurations";
import { user } from "./user";

export const appConfiguration = {
  appName: "Mock App",
  deployingUserEmail: user.email,
  admins: ["mockman@mocks.net", 'admin@mocks.net', 'otherguy@mocks.net'],
  dataSourceConfigurations,
  viewConfigurations,
};
