import { createContext, useEffect, useReducer, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
export const AuthContext = createContext();
import { url } from '../utils/url';


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

    const profile = async () => {
        try {
            const res = await fetch(`${url}/api/users/profile`, {
                method: 'GET',
                credentials: 'include',
            })
            if (!res.ok) {
                dispatch({ type: 'LOGOUT' });
                return null;
            }
            if (res.ok) {
                const data = await res.json();
                dispatch({ type: 'LOGIN', payload: data.data.user });
                return data.data.user;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const { isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: profile,


    })

    return (
        <AuthContext.Provider value={{ ...state, isLoading, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
