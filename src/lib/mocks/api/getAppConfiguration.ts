import sleep from "../sleep";
import { appConfiguration } from "../data/appConfiguration";
import { AppConfigurationType, UserType, User } from "../../../types/schemas";
import { users } from "../data/user";

export async function getAppConfiguration(): Promise<AppConfigurationType> {
  sleep();

  let appConfig = {
    ...appConfiguration,
    admins: getAdmins_(),
  };

  let mockResponse = appConfig;

  console.log("mockResponse", mockResponse);

  return JSON.parse(JSON.stringify(mockResponse));

  function getAdmins_(): UserType[] {
    // Return variable
    let adminUsers = [];

    // Loop through script properties object
    for (let a = 0; a < users.length; a++) {
      try {
        // Weed out properties that do not reprsent users
        let user = User.parse(users[a]);

        // If the user has an admin role, add them to our list
        if (user.roles.includes("admin")) {
          adminUsers.push(user);
        }
      } catch (error) {
        // Not a user, carry on
        console.error(error);
      }
    }

    return adminUsers;
  }
}
