type EnvironmentDetails = {
  executeAs: "USER_DEPLOYING" | "USER_ACCESSING";
  domain: {
    type: "Personal" | "Workspace";
    name: string;
  };
};

export const ENV: EnvironmentDetails = {
  executeAs: "USER_DEPLOYING", // "USER_DEPLOYING" | "USER_ACCESSING"
  domain: {
    type: "Personal",
    name: "",
  },
};
