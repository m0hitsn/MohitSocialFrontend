import { createContext, useReducer } from "react"
import { AuthReducer } from "./AuthReducer";

let INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false
}
const localdata = JSON.parse(localStorage.getItem('MohitSocialUserId'));
INITIAL_STATE.user = localdata;

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    if (state.user !== null) {
        localStorage.setItem("MohitSocialUserId", JSON.stringify(state.user))
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}>
            {children}
        </AuthContext.Provider>
    );
}