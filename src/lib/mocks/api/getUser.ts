import sleep from "../sleep";
import { user, users } from "../data/user";
import { UserType } from "../../../types/schemas";
import { GetUserArgs } from "../../../server/api/getUser";

/**
 * @param {GetUserArgs} [optionalArgs] - Optional parameter containing user email
 * @returns {Promise<UserType>}
 */
export async function getUser(
  { email }: GetUserArgs = { email: undefined }
): Promise<UserType | undefined> {
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
