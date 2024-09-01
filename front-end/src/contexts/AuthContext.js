import { createContext, useEffect, useReducer, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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

    // const [loading, setLoading] = useState(true);

    const profile = async () => {
        try {
            const res = await fetch('http://localhost:4000/users/profile', {
                method: 'GET',
                credentials: 'include',
            })
            if (!res.ok) {
                dispatch({ type: 'LOGOUT' });
                // setLoading(false);
            }
            if (res.ok) {
                const data = await res.json();
                dispatch({ type: 'LOGIN', payload: data.data.user });
                // setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
            // setLoading(false);
        }
    }
    // useEffect(() => {
    //     profile();
    // }
    //     , []);

    const { isLoading } = useQuery({
        queryKey: 'profile',
        queryFn: profile,

    })

    return (
        <AuthContext.Provider value={{ ...state, isLoading, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};