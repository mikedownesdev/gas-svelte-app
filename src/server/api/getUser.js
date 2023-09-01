/**
 * @typedef {Object} GetUserArgs
 * @property {string} email
 */
/**
 * **API Endpoint** | Returns the accessing user object
 * @param {GetUserArgs} [optionalArgs] - Optional parameter containing user email.
 * @returns {Promise<User>}
 */
async function getUser({ email } = { email: undefined }) {
  let requestingUserEmail = Session.getActiveUser().getEmail();
  let EMAIL_FOR_RETRIEVAL = email || requestingUserEmail;
  let isRequestForSelf = requestingUserEmail === EMAIL_FOR_RETRIEVAL;

  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const scriptProperties = scriptPropertiesService.getProperties();
  let userObjectString = scriptProperties[EMAIL_FOR_RETRIEVAL];

  // If the requested user's object doesnt exist and the request is from
  // someone other than the requested user, return null.
  if (!userObjectString && !isRequestForSelf) {
    return null;
  }
  // Else if the the request user's object doesn't exist but it is a request
  // from the requested user, create the user object and return it. They
  // now exist in the system.
  else if (!userObjectString && isRequestForSelf) {
    let user = createUser_(EMAIL_FOR_RETRIEVAL);
    return user;
  }

  // Otherwise, the user object exists and we can return it.
  let user = JSON.parse(userObjectString);

  return user;
}

/**
 * Creates a new user object with defaults and stores it in script properties.
 * @param {string} email
 * @returns {User}
 */
function createUser_(email) {
  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const profileImgUrl = loadUserProfileImageUrl_(email);

  let user = {
    email,
    roles: [],
    preferences: {},
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

// Thread 1
// async function loadUserRoles_(email) {

//   var roles = [];
//   const appConfiguration = getAppConfiguration();

//   if (!appConfiguration) {
//     throw new Error("App configuration not found, can't load user roles");
//   }

//   if (email === Session.getEffectiveUser().getEmail()) {
//     roles.push("superAdmin");
//   }
//   if (
//     appConfiguration.admins.includes(email) ||
//     roles.includes("superAdmin")
//   ) {
//     roles.push("admin");
//   }

//   return roles;
// }

// // Thread 2
// async function loadUserPreferences_(email) {
//   return getUserPreferences();
// }

// /**
//  *
//  * @param {string} email
//  * @returns {Promise<UserActivity> }
//  */
// async function loadUserActivity_(email) {
//   return {
//     firstActiveAt: "A long time ago...",
//     lastActiveAt: new Date().toISOString(),
//   };
// }

// async function loadUserProfile_(email) {

// }

/**
 *
 * @param {string} email
 * @returns {string} A promise resolving to the user's profile image URL or a default img URL.
 */
function loadUserProfileImageUrl_(email) {
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
