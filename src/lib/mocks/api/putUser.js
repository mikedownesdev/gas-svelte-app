import sleep from "../sleep";
import { z } from 'zod';

/**
 * **API Endpoint** | Updates the app configuration and returns it
 * @param {PutUserArgs} args
 * @returns {Promise<User>}
 */
export async function putUser({ user }) {
  await sleep();

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

  const validUser = userSchema.parse(user);

  /** @type {User} */
  let mockResponse = validUser

  console.log("mockResponse_user", mockResponse);

  return JSON.parse(JSON.stringify(mockResponse));
}
