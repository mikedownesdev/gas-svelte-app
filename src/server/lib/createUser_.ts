import { UserType } from "../../types/schemas";

/**
 * Creates a new user object with defaults and stores it in script properties.
 * @param {string} email
 * @returns {User}
 */
export function createUser_(email: string): UserType {
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const profileImgUrl = loadUserProfileImageUrl_(email);

  let user: UserType = {
    email,
    roles: [],
    preferences: {
      theme: "light",
    },
    profile: {
      imageUrl: profileImgUrl,
    },
    activity: [
      {
        label: "User Created",
        value: new Date().toISOString(),
      },
    ],
  };

  scriptPropertiesService.setProperty(email, JSON.stringify(user));

  return user;
}
