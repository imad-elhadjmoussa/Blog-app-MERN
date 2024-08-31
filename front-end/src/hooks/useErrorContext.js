import { useContext } from "react";
import { ErrorContext } from "../contexts/errorContext";

export const useErrorContext = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useErrorContext must be used within an ErrorProvider");
    }
    return context;
}