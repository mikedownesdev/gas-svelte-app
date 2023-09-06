import sleep from "../sleep";
import { PutUserArgs } from "../../../server/api/putUser";
import { User, UserType } from "../../../types/schemas";

/**
 * **API Endpoint** | Updates the app configuration and returns it
 * @param {PutUserArgs} args
 * @returns {Promise<UserType>}
 */
export async function putUser({ user }: PutUserArgs): Promise<UserType> {
  await sleep();

  const validUser = User.parse(user);

  /** @type {UserType} */
  let mockResponse = validUser;

  console.log("mockResponse_user", mockResponse);

  return JSON.parse(JSON.stringify(mockResponse));
}
