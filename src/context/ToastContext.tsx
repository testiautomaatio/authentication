/*
 * Toast is a simple context that provides a function to show a toast message.
 * It uses the Snackbar component from Material-UI to show the message.
 */

import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

type LevelType = "success" | "error" | "warning" | "info";

type ToastContextType = {
    showToast: (message: string, severity?: LevelType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<LevelType>("success");

    const showToast = (msg: string, sev: LevelType = "info") => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={severity} variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}