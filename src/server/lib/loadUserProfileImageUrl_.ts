import { ENV } from "../env";

/**
 *
 * @param {string} email
 * @returns {string} A promise resolving to the user's profile image URL or a default img URL.
 */
export function loadUserProfileImageUrl_(email: string): string {
  let userPictureUrl;
  let defaultPictureUrl =
    "https://lh3.googleusercontent.com/a-/AOh14Gj-cdUSUVoEge7rD5a063tQkyTDT3mripEuDZ0v=s100";
  try {
    // @ts-ignore
    // We don't have People Advanced Service types
    let people = People.People.searchDirectoryPeople({
      query: email,
      readMask: "photos",
      sources: "DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE",
    });

    userPictureUrl = people.people[0].photos[0].url;
  } catch (err) {
    console.log(err);
  }

  return userPictureUrl ?? defaultPictureUrl;
}

// function loadUserProfileImageUrl_(email: string | null = null): string {

//   let defaultPictureUrl = "https://lh3.googleusercontent.com/a-/AOh14Gj-cdUSUVoEge7rD5a063tQkyTDT3mripEuDZ0v=s100";
//   let profileImageUrl = defaultPictureUrl

//   if (email === null) {

//   }

//   if (ENV.executeAs === "USER_ACCESSING") {
//     profileImageUrl = DriveApp.getRootFolder().getOwner().getPhotoUrl();
//   }

//   return profileImageUrl
// }
