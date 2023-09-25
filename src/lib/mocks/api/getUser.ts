import sleep from "../sleep";
import { user, users } from "../data/user";
import { UserType } from "../../../types/schemas";
import { GetUserArgs } from "../../../server/api/getUser";

/**
 * @param {GetUserArgs} [optionalArgs] - Optional parameter containing user email
 * @returns {Promise<UserType>}
 */
export async function getUser(
  { email }: GetUserArgs = { email: null }
): Promise<UserType | null> {
  await sleep();

  /** @type {User | undefined} */
  let mockResponse = null;

  if (!email) {
    mockResponse = user;
  } else {
    let user = users.find((user) => user.email === email);
    if (user) {
      mockResponse = user;
    }
  }

  console.log("mockResponse", mockResponse);

  return JSON.parse(JSON.stringify(mockResponse));
}
