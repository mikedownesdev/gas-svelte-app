/** @type {User} */
export const user = {
    email: "mock.mockerson@mock.net",
    roles: ["superAdmin", "admin"],
    profileImgUrl: "http://via.placeholder.com/48x48",
    preferences: {
        firstName: "Mock",
        lastName: "Mockerson",
    },
    activity: {
        firstActiveAt: "2023-01-01T00:00:00.000Z",
        lastActiveAt: new Date().toISOString()
    }

}