import { useState } from "react";
import { useAuth } from "./useAuth";
import { useErrorContext } from "./useErrorContext";
import { useNavigate } from "react-router-dom";
import { AUTH_ACTIONS } from "../contexts/AuthContext";
import { login } from "../apis/user";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    const { dispatch } = useAuth();
    const navigation = useNavigate();

    const { mutate, isPending, error } = useMutation({
        mutationFn: (user) => login(user),
        onSuccess: (data) => {
            dispatch({ type: AUTH_ACTIONS.LOGIN, payload: data });
            navigation('/');
        },
    })


    return { login:mutate, isPending, error };
}
