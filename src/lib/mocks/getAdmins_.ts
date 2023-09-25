import { UserType, User } from "../../types/schemas";
import { users } from "./data/user";

/**
 *
 * @returns {UserType[]}
 */
export function getAdmins_(): UserType[] {
  // Return variable
  let adminUsers = [];

  // Loop through script properties object
  for (let a = 0; a < users.length; a++) {
    try {
      // Weed out properties that do not reprsent users
      let user = User.parse(users[a]);

      // If the user has an admin role, add them to our list
      if (user.roles.includes("admin")) {
        adminUsers.push(user);
      }
    } catch (error) {
      // Not a user, carry on
      console.error(error);
    }
  }

  return adminUsers;
}
