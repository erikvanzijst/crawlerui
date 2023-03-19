import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useContext} from "react";
import {AuthContext} from "./AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from '@mui/icons-material/Login';
import LoginDialog from "./LoginDialog";

export default function Header() {
    const {username, setUsername} = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);

    function login(username) {
        setOpen(false);
        setUsername(username);
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {username}
                    </Typography>
                    {username ?
                        <Button color="inherit" onClick={() => setUsername(null)}><LogoutIcon/>Logout</Button>
                        :
                        <Button color="inherit" onClick={() => setOpen(true)}><LoginIcon/>Login</Button>
                    }
                </Toolbar>
            </AppBar>
            <LoginDialog open={open} handleClose={login}></LoginDialog>
        </Box>
    );
}
