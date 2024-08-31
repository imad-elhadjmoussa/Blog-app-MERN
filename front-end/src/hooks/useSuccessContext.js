import { useContext } from "react";
import { SuccessContext } from "../contexts/successContext";

export const useSuccessContext = () => {
    const context = useContext(SuccessContext);
    if (!context) {
        throw new Error("useErrorContext must be used within an SuccessProvider");
    }
    return context;
}