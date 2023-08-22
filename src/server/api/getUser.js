function getUserPictureUrl(email) {
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

async function getUser() {
  // const userPreferences = await getUserPreferences();

  const SESSION_ACTIVE_USER_EMAIL = Session.getActiveUser().getEmail();

  // Thread 1
  async function loadUserInfo() {
    const email = SESSION_ACTIVE_USER_EMAIL;

    var roles = [];
    const appConfiguration = getAppConfiguration();

    if (!appConfiguration) {
      return {};
    }

    if (SESSION_ACTIVE_USER_EMAIL === Session.getEffectiveUser().getEmail()) {
      roles.push("superAdmin");
    }
    if (
      appConfiguration.admins.includes(email) ||
      roles.includes("superAdmin")
    ) {
      roles.push("admin");
    }

    const profileImgUrl = getUserPictureUrl(email);

    // const profileImgUrl = await getUserPictureUrl(email);

    return {
      email,
      profileImgUrl: profileImgUrl,
      roles,
    };
  }

  // Thread 2
  async function loadUserPreferencesAsync() {
    return getUserPreferences();
  }

  // Thread 3
  async function loadUserActivity() {
    return {
      firstActiveAt: "A long time ago...",
      lastActiveAt: new Date().toISOString(),
    };
  }

  const [userInfo, userPreferences, userActivity] = await Promise.all([
    loadUserInfo(),
    loadUserPreferencesAsync(),
    loadUserActivity(),
  ]).catch((err) => console.log(err));

  /** @type {User} */
  let user = {
    email: userInfo.email,
    profileImgUrl: userInfo.profileImgUrl,
    roles: userInfo.roles,
    preferences: userPreferences,
    activity: userActivity,
  };

  console.log(user);
  return user;
}
