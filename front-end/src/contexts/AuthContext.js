import { createContext, useEffect, useReducer, useState } from 'react';
export const AuthContext = createContext();

export const AUTH_ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

const authReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'LOGIN':
            return {
                user: payload,
            };
        case 'LOGOUT':
            return {
                user: null,
            };
        default:
            return state;
    }
}

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    const [loading, setLoading] = useState(true);

    const profile = async () => {
        try {
            const res = await fetch('http://localhost:4000/users/profile', {
                method: 'GET',
                credentials: 'include',
            })
            if (!res.ok) {
                dispatch({ type: 'LOGOUT' });
                setLoading(false);
            }
            if (res.ok) {
                const data = await res.json();
                dispatch({ type: 'LOGIN', payload: data.data.user });
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        profile();
    }
        , []);

    return (
        <AuthContext.Provider value={{ ...state,loading, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};