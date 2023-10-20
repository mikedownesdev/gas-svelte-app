import { UserType } from "../../types/schemas";
import { createUser_ } from "../lib/createUser_";
import { z } from "zod";

export type GetUserArgs = {
  email: string | null;
};

/**
 * **API Endpoint** | Returns the accessing user object
 * @param {GetUserArgs} [optionalArgs] - Optional parameter containing user email. If no email is provided, the requesting user's email is used.
 * @returns {Promise<User>}
 */
async function getUser(
  { email }: GetUserArgs = { email: null }
): Promise<UserType | null> {
  let requestingUserEmail = Session.getActiveUser().getEmail();
  // Report request
  console.log(
    "getUser called with args:",
    { email },
    " | by: ",
    requestingUserEmail
  );

  // Validate the arguments against the schema
  const GetUserArgsSchema = z.object({
    email: z.string().nullable(),
  });
  const validArgs = GetUserArgsSchema.parse({ email });

  let EMAIL_FOR_RETRIEVAL = validArgs.email || requestingUserEmail;
  let isRequestForSelf = requestingUserEmail === EMAIL_FOR_RETRIEVAL;

  const scriptPropertiesService = PropertiesService.getScriptProperties();
  const scriptProperties = scriptPropertiesService.getProperties();
  let userObjectString = scriptProperties[EMAIL_FOR_RETRIEVAL];

  // If the requested user's object doesnt exist and the request is from
  // someone other than the requested user, return null.
  if (!userObjectString && !isRequestForSelf) {
    return null;
  }
  // Else if the the request user's object doesn't exist but it is a request
  // from the requested user, create the user object and return it. They
  // now exist in the system.
  else if (!userObjectString && isRequestForSelf) {
    let user = createUser_(EMAIL_FOR_RETRIEVAL);
    return user;
  }

  // Otherwise, the user object exists and we can return it.
  let user = JSON.parse(userObjectString);

  return user;
}
