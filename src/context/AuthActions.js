export const LoginStart = (usercredential) => ({
    type: "LoginStart"
});
export const LoginSuccess = (user) => ({
    type: "LoginSuccess",
    payload: user,
})
export const LoginFailure = (error) => ({
    type: "LoginFailure",
    payload: error,
})
export const Follow = (userId) => ({
    type: "Follow",
    payload: userId,
})
export const Unfollow = (userId) => ({
    type: "Unfollow",
    payload: userId,
})
export const updateProfile = (Profile) => ({
    type: "updateProfile",
    payload: Profile,
})