import { User, UserType } from "../../types/schemas";

export type PutUserArgs = {
  user: UserType;
};

/**
 * **API Endpoint** | Updates the app configuration and returns it
 * @param {PutUserArgs} args
 * @returns {UserType}
 */
export function putUser({ user }: PutUserArgs): UserType {
  const invokingUserEmail = Session.getActiveUser().getEmail();

  console.log("putUser() called with: ", user, "by: ", invokingUserEmail);

  const validUser = User.parse(user);

  if (
    validUser.email !== invokingUserEmail &&
    validUser.email !== Session.getEffectiveUser().getEmail()
  ) {
    throw new Error(
      "A user resource can only be updated by themselves or the superAdmin."
    );
  }

  // If the code reaches here, the user object is valid
  // and the invoking user is either the user or a superAdmin.
  const propertyKey = validUser.email;
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  scriptPropertiesService.setProperty(propertyKey, JSON.stringify(validUser));

  console.log("User successfully saved.");
  return validUser;
}
