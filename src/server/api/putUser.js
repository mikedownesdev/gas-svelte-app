/**
 * @typedef {Object} PutUserArgs
 * @property {User} user
 */
/**
 * **API Endpoint** | Updates the app configuration and returns it
 * @param {PutUserArgs} args
 * @returns {User | null}
 */
function putUser({ user }) {
  // TODO: Zod Validation of appConfiguration
  console.log("putUser() called with: ", user);

  const propertyKey = user.email;
  const scriptPropertiesService = PropertiesService.getScriptProperties();

  scriptPropertiesService.setProperty(propertyKey, JSON.stringify(user));

  return user;
}
