/** @type {User} */
export const user = {
  email: "mock_mockerson@test.com",
  roles: ["superAdmin", "admin"],
  profile: {
    firstName: "Mock",
    lastName: "Mockerson",
    imageUrl: "../../../images/man2.jpeg",
  },
  preferences: {
    theme: "dark",
  },
  activity: [
    { label: "User Created", value: "2021-01-01T00:00:00.000Z" },
    { label: "User Updated", value: "2021-01-01T00:00:00.000Z" },
  ],
};

/** @type {User[]} */
export const users = [
  user,
  {
    email: "johndoe",
    roles: ["admin"],
    profile: {
      firstName: "John",
      lastName: "Doe",
      imageUrl: "../../../images/man1.jpeg",
    },
    preferences: {},
    activity: [
      { label: "User Created", value: "2023-01-01T00:00:00.000Z" },
      { label: "User Updated", value: "2023-03-12T00:00:00.000Z" },
    ],
  },
  {
    email: "janedoe",
    roles: [],
    profile: {
      firstName: "Jane",
      lastName: "Doe",
      imageUrl: "../../../images/woman1.jpeg",
    },
    preferences: {},
    activity: [
      { label: "User Created", value: "2023-01-01T00:00:00.000Z" },
      { label: "User Updated", value: "2023-03-12T00:00:00.000Z" },
    ],
  },
];
