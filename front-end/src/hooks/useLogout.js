import { url } from "../utils/url";
import { useAuth } from "./useAuth";
import { useErrorContext } from "./useErrorContext";

export const useLogout = () => {

    const { dispatch } = useAuth();
    const { setError } = useErrorContext();

    const logout = async () => {

        try {
            const res = await fetch(`${url}/api/users/logout`, {
                method: 'POST',
                credentials: 'include',
            })
            if (!res.ok) {
                setError("Failed to logout");
            }
            if (res.ok) {
                dispatch({ type: 'LOGOUT' });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return {
        logout
    };
}
