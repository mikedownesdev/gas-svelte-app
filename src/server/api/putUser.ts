import { User, UserType } from "../../types/schemas";

export type PutUserArgs = {
  user: UserType;
};

/**
 * **API Endpoint** | Updates the app configuration and returns it
 * @param {PutUserArgs} args
 * @returns {UserType}
 */
function putUser({ user }: PutUserArgs): UserType {
  console.log("putUser() called with: ", user);

  const validUser = User.parse(user);

  // If the code reaches here, the user object is valid
  const propertyKey = validUser.email;
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  scriptPropertiesService.setProperty(propertyKey, JSON.stringify(validUser));

  console.log("User successfully saved.");
  return validUser;
}
