export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LoginStart":
            return {
                user: null,
                isFetching: true,
                error: false,
            }
        case "LoginSuccess":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            }
        case "LoginFailure":
            return {
                user: null,
                isFetching: false,
                error: true,
            }
        case "Follow":
            // console.log("follow");
            return {
                ...state,
                user: {
                    ...state.user,
                    Following: [...state.user.Following, action.payload]
                }

            }
        case "Unfollow":
            return {
                ...state,
                user: {
                    ...state.user,
                    Following: state.user.Following.filter(following => following !== action.payload)
                }
            }
        case "updateProfile":
            return {
                ...state,
                user: {
                    ...state.user,
                    ProfilePicture: action.payload
                }
            }

        default:
            return state
    }
}