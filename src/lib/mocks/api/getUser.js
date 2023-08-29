import sleep from "../sleep";
import { user, users } from "../data/user";

/**
 * @param {GetUserArgs} [optionalArgs] - Optional parameter containing user email
 * @returns {Promise<User>}
 */
export async function getUser({ email } = { email: undefined }) {
  await sleep();

  /** @type {User | undefined} */
  let mockResponse = undefined;

  if (!email) {
    mockResponse = user;
  } else {
    mockResponse = users.find((user) => user.email === email);
  }

  console.log("mockResponse", mockResponse);

  return JSON.parse(JSON.stringify(mockResponse));
}
