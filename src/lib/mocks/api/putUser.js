import sleep from "../sleep";

/**
 * **API Endpoint** | Updates the app configuration and returns it
 * @param {PutUserArgs} args
 * @returns {Promise<User>}
 */
export async function putUser({ user }) {
  await sleep();

  /** @type {User} */
  let mockResponse = user;

  console.log("mockResponse_user", mockResponse);

  return JSON.parse(JSON.stringify(mockResponse));
}
