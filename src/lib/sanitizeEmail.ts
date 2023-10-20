export const sanitizeEmail = (email: string) => {
  const charsToRemove = ["@", "."];
  const newString = email.replace(
    new RegExp(`[${charsToRemove.join("")}]`, "g"),
    ""
  );
  return newString;
};
