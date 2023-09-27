/**
 *
 * @returns
 */
export function getDeploymentDomain_() {
  try {
    // @ts-ignore
    // We don't have People Advanced Service types
    let people = People.People.searchDirectoryPeople({
      query: "",
      readMask: "photos",
      sources: "DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE",
    });
  } catch (err) {
    if (err.toString().includes("Must be a G Suite domain user")) {
      return "Personal";
    } else {
      console.error(err);
    }
  }

  return "Business";
}
