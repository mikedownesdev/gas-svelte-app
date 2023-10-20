import { UserType } from "../../../types/schemas";

export const user: UserType = {
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

export const users: UserType[] = [
  user,
  {
    email: "johndoe@test.com",
    roles: ["admin"],
    profile: {
      firstName: "John",
      lastName: "Doe",
      imageUrl: "../../../images/man1.jpeg",
    },
    preferences: {
      theme: "light",
    },
    activity: [
      { label: "User Created", value: "2023-01-01T00:00:00.000Z" },
      { label: "User Updated", value: "2023-03-12T00:00:00.000Z" },
    ],
  },
  {
    email: "janedoe@test.com",
    roles: [],
    profile: {
      firstName: "Jane",
      lastName: "Doe",
      imageUrl: "../../../images/woman1.jpeg",
    },
    preferences: {
      theme: "light",
    },
    activity: [
      { label: "User Created", value: "2023-01-01T00:00:00.000Z" },
      { label: "User Updated", value: "2023-03-12T00:00:00.000Z" },
    ],
  },
];
