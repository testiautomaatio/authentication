/**
 * Source: https://github.com/mui/material-ui/tree/v6.4.6/docs/data/material/getting-started/templates/
 * License: MIT, https://github.com/mui/material-ui/blob/master/LICENSE
 */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ForgotPassword from './components/ForgotPassword';
import { GoogleIcon, FacebookIcon } from './components/CustomIcons';
import { useNavigate, Link as RouterLink } from "react-router";
import { useAuth } from './auth';
import { Alert } from '@mui/material';
import { useToast } from './context/ToastContext';
import { Card } from './shared-theme/Container';



export default function SignIn() {
    const { isLoading, authenticate } = useAuth();
    const navigate = useNavigate();

    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [loginError, setLoginError] = React.useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const { showToast } = useToast();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        handleLogin(email, password);
    };

    const handleLogin = async (email: string, password: string) => {
        setLoginErrorMessage("");
        setLoginError(false);

        if (!validateInputs(email, password)) {
            console.log("not valid")
            return false;
        };

        try {
            if (await authenticate(email, password)) {
                navigate('/dashboard');
                showToast('Successfully logged in', 'success');
            }
        } catch (e) {
            setLoginError(true);
            setLoginErrorMessage((e as Error).message);
        }

    }
    const validateInputs = (email: string, password: string) => {
        let isValid = true;
        setEmailError(false);
        setEmailErrorMessage('');
        setPasswordError(false);
        setPasswordErrorMessage('');

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        }

        if (!password || password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        }

        return isValid;
    };

    return (

        <Card variant="outlined">
            <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
                Sign in
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <ForgotPassword open={open} handleClose={handleClose} />

                {loginError && (
                    <Alert severity="error">{loginErrorMessage}</Alert>
                )}
                <Button
                    type='submit'
                    fullWidth
                    variant="contained"
                >
                    {isLoading ? <progress /> : "Sign in"}
                </Button>
                <Link
                    component="button"
                    type="button"
                    onClick={handleClickOpen}
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                >
                    Forgot your password?
                </Link>
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => showToast('This feature has not been implemented.', 'warning')}
                    startIcon={<GoogleIcon />}
                >
                    Sign in with Google
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => showToast('This feature has not been implemented.', 'warning')}
                    startIcon={<FacebookIcon />}
                >
                    Sign in with Facebook
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Don&apos;t have an account?{' '}
                    <Link
                        component={RouterLink}
                        to="/signUp"
                        variant="body2"
                        sx={{ alignSelf: 'center' }}
                    >
                        Sign up
                    </Link>
                </Typography>
            </Box>
        </Card>
    );
}
