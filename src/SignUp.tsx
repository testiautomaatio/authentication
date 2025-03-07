/**
 * Source: https://github.com/mui/material-ui/tree/v6.4.6/docs/data/material/getting-started/templates/
 * License: MIT, https://github.com/mui/material-ui/blob/master/LICENSE
 */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { GoogleIcon, FacebookIcon } from './components/CustomIcons';
import { Link as RouterLink, useNavigate } from "react-router";
import { useAuth } from './auth';
import { Alert } from '@mui/material';
import { useToast } from './context/ToastContext';
import { Card } from './shared-theme/Container';


export default function SignUp() {
    const { isLoading, createUser } = useAuth();
    const navigate = useNavigate();

    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const [registrationError, setRegistrationError] = React.useState(false);
    const [registrationErrorMessage, setRegistrationErrorMessage] = React.useState('');
    const { showToast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const name = data.get('name') as string;
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        handleRegistration(name, email, password)
    };

    const handleRegistration = async (name: string, email: string, password: string) => {

        setRegistrationError(false);
        setRegistrationErrorMessage('');

        if (!validateInputs(name, email, password)) {
            return false;
        }

        try {
            await createUser(name, email, password);
            navigate('/');
            showToast('Account created successfully', 'success');

        } catch (e) {
            setRegistrationError(true);
            setRegistrationErrorMessage((e as Error).message);
        }
    };

    const validateInputs = (name: string, email: string, password: string) => {
        let isValid = true;

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password || password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!name || name.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
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
                Sign up
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <FormControl>
                    <FormLabel htmlFor="name">Full name</FormLabel>
                    <TextField
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        autoFocus
                        id="name"
                        placeholder="Jon Snow"
                        error={nameError}
                        helperText={nameErrorMessage}
                        color={nameError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        placeholder="your@email.com"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        error={emailError}
                        helperText={emailErrorMessage}
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive updates via email."
                />
                {registrationError && <Alert severity="error">{registrationErrorMessage}</Alert>}
                <Button
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                    variant="contained"
                >
                    Sign up
                </Button>
            </Box>
            <Divider>
                <Typography sx={{ color: 'text.secondary' }}>or</Typography>
            </Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => showToast('This feature has not been implemented.', 'warning')}
                    startIcon={<GoogleIcon />}
                >
                    Sign up with Google
                </Button>
                <Button
                    fullWidth
                    onClick={() => showToast('This feature has not been implemented.', 'warning')}
                    variant="outlined"
                    startIcon={<FacebookIcon />}
                >
                    Sign up with Facebook
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link
                        component={RouterLink}
                        to="/"
                        variant="body2"
                        sx={{ alignSelf: 'center' }}
                    >
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </Card>
    );
}
