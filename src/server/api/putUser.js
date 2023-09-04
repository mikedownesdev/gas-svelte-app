if (typeof require !== 'undefined') {
  let z = require('zod').z;
}
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
  
  console.log("putUser() called with: ", user);

  // Validating the user
  const userSchema = z.object({
    email: z.string().email(),
    roles: z.array(z.string()),
    profile: z.object({
      imageUrl: z.string()
    }),
    preferences: z.object({
      theme: z.enum(['light', 'dark']),
    }),
    activity: z.array(
      z.object({
        label: z.string(),
        value: z.string() //should be a very particular type of string
      })
    ),
  });

  try {
    // Validate the user object against the schema
    /** @type User */
    const validUser = userSchema.parse(user);

    // If the code reaches here, the user object is valid
    const propertyKey = validUser.email;
    const scriptPropertiesService = PropertiesService.getScriptProperties();
    scriptPropertiesService.setProperty(propertyKey, JSON.stringify(validUser));

    console.log("User successfully saved.");
    return validUser;

  } catch (error) {
    // The user object was invalid
    console.error("Invalid user object:", error);
    return null;
  }
}