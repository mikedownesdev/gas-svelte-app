import { UserType, User } from "../../types/schemas";
import { loadUserProfileImageUrl_ } from "./loadUserProfileImageUrl_";

export function createUser_(email: string, overrides = {}): UserType {
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const profileImgUrl = loadUserProfileImageUrl_(email);

  let userDefaults: UserType = {
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

  let user = {
    ...userDefaults,
    ...overrides,
  };

  let validUser = User.parse(user); // throws if invalid

  scriptPropertiesService.setProperty(email, JSON.stringify(validUser));

  return user;
}
