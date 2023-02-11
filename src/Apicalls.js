import axios from "axios";
const baseurl = process.env.REACT_APP_BASE_URL
const logincall = async (usercredential, dispatch) => {
    dispatch({ type: "LoginStart" })
    try {
        const res = await axios.post(baseurl + "/auth/login", usercredential);
        dispatch({ type: "LoginSuccess", payload: res.data })
    } catch (error) {
        dispatch({ type: "LoginFailure", payload: error })
    }
}
export default logincall;