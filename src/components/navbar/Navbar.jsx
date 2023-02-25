import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'
import MenuIcon from '@mui/icons-material/Menu'

const user = {
    name: 'Nicolas',
    email: 'nico.minahk@gmail.com',
}

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ bgcolor: 'black' }}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Namastrek
                    </Typography>

                    {!user.email && (
                        <LoginIcon color="white">
                            <Typography>Login</Typography>
                        </LoginIcon>
                    )}
                    {user.email && (
                        <LogoutIcon color="white" position="fixed">
                            <Typography>Logout</Typography>
                        </LogoutIcon>
                    )}
                    <AccountCircleIcon>
                        {/* <Typography variant="x-small">{user.email}</Typography> */}
                    </AccountCircleIcon>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
