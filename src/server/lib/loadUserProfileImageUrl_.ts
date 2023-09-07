/**
 *
 * @param {string} email
 * @returns {string} A promise resolving to the user's profile image URL or a default img URL.
 */
function loadUserProfileImageUrl_(email: string): string {
  let userPictureUrl;
  let defaultPictureUrl =
    "https://lh3.googleusercontent.com/a-/AOh14Gj-cdUSUVoEge7rD5a063tQkyTDT3mripEuDZ0v=s100";
  try {
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
