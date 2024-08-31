import { useState } from "react";
import { useAuth } from "./useAuth";
import { useErrorContext } from "./useErrorContext";
import { useNavigate } from "react-router-dom";
import { AUTH_ACTIONS } from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { register } from "../apis/user";

export const useRegister = () => {
    const { dispatch } = useAuth();
    const navigation = useNavigate();

    const { mutate, isPending, error } = useMutation({
        mutationFn: (user) => register(user),
        onSuccess: (data) => {
            dispatch({ type: AUTH_ACTIONS.LOGIN, payload: data })
            navigation('/')
        },
        onError: (error) => {
            console.log(error.message);
        }
    })


    return { isPending, error, register: mutate };
}
