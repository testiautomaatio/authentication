import { Routes, Route, Navigate, BrowserRouter } from "react-router";
import SignIn from './SignIn'
import SignUp from './SignUp'
import Dashboard from "./Dashboard";
import { useAuth } from "./auth";
import { ReactNode } from "react";
import { ToastProvider } from './context/ToastContext';
import AppTheme from "./shared-theme/AppTheme";
import { CssBaseline } from "@mui/material";
import { ScreenContainer } from "./shared-theme/Container";
import ColorModeSelect from "./shared-theme/ColorModeSelect";

export default function App() {
    return (
        <ToastProvider>
            <AppTheme>
                <CssBaseline enableColorScheme />
                <ScreenContainer direction="column" justifyContent="space-between">
                    <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                    <Router />
                </ScreenContainer>
            </AppTheme>
        </ToastProvider>
    );
}

function Router() {
    return (
        <BrowserRouter>
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
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
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

/**
 * A simple component to show a 404 page.
 */
function NotFound() {
    return <div>Not Found</div>
}