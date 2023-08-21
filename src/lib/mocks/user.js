/** @type {User} */
export const user = {
    email: "mock_mockerson@test.com",
    roles: ["superAdmin", "admin"],
    profileImgUrl: "../../../images/man2.jpeg",
    preferences: {
        firstName: "Mock",
        lastName: "Mockerson",
    },
    activity: {
        firstActiveAt: "2023-01-01T00:00:00.000Z",
        lastActiveAt: new Date().toISOString()
    }
}

export const users = [
    user,
    {
        email: "johndoe",
        roles: ["admin"],
        profileImgUrl: "../../../images/man1.jpeg",
        preferences: {
            firstName: "John",
            lastName: "Doe",
        },
        activity: {
            firstActiveAt: "2023-01-01T00:00:00.000Z",
            lastActiveAt: "2023-03-12T00:00:00.000Z",
        }
    },
    {
        email: "janedoe",
        roles: [],
        profileImgUrl: "../../../images/woman1.jpeg",
        preferences: {
            firstName: "Jane",
            lastName: "Doe",
        },
        activity: {
            firstActiveAt: "2023-01-01T00:00:00.000Z",
            lastActiveAt: "2023-03-12T00:00:00.000Z",
        }
    }
]