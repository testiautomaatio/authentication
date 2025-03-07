import { HashRouter, Routes, Route, Navigate } from "react-router";

import SignIn from './SignIn'
import SignUp from './SignUp'
import Dashboard from "./Dashboard";
import { useAuth } from "./auth";
import { ReactNode } from "react";
import { ToastProvider } from './context/ToastContext';

export default function App() {
    return (
        <ToastProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={
                        <NoAuth><SignIn /></NoAuth>
                    } />
                    <Route path="/signUp" element={
                        <NoAuth><SignUp /></NoAuth>
                    } />
                    <Route path="/dashboard" element={
                        <RequireAuth>
                            <Dashboard />
                        </RequireAuth>
                    } />
                </Routes>
            </HashRouter >
        </ToastProvider >
    )
}

/**
 * This function redirects logged in users to the dashboard.
 * Unauthenticated users can access the children.
 */
function NoAuth({ children }: { children: ReactNode }) {
    const { currentUser } = useAuth();
    return currentUser ? <Navigate to="/dashboard" replace /> : children;
}

/**
 * This component requires authentication to access the children.
 * Unauthenticated users are redirected to the home page for login.
 */
function RequireAuth({ children }: { children: ReactNode }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/" replace />;
}
