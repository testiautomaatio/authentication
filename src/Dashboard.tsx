/**
 * Source: https://github.com/mui/material-ui/tree/v6.4.6/docs/data/material/getting-started/templates/
 * License: MIT, https://github.com/mui/material-ui/blob/master/LICENSE
 */
import Typography from '@mui/material/Typography';
import { useAuth } from './auth';
import { Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from "react-router";
import { useToast } from './context/ToastContext';
import { Card } from './shared-theme/Container';
import ReactConfetti from 'react-confetti';

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        showToast("You have been logged out.", "info");
        navigate("/");
    };

    return (
        <Card variant="outlined">
            <ReactConfetti />
            <Typography variant="h4" gutterBottom>
                Welcome {currentUser?.name}!
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                You have successfully created a user account and signed in!
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
            </Button>
        </Card>
    );
}
