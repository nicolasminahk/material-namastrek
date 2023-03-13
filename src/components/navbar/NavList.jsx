import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { Inbox } from '@mui/icons-material'
import HikingIcon from '@mui/icons-material/Hiking'
import LoyaltyIcon from '@mui/icons-material/Loyalty'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const NavList = () => {
    const navigate = useNavigate()
    const { loginWithRedirect, user, isAuthenticated } = useAuth0()

    return (
        <Box sx={{ width: 250, borderRadius: 3 }}>
            <nav>
                <List>
                    <ListItem onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <CalendarMonthIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                    <ListItem onClick={() => navigate('/activitys')}>
                        <ListItemIcon>
                            <HikingIcon color="green" />
                        </ListItemIcon>
                        <ListItemText primary="Salidas" />
                    </ListItem>
                    <ListItem onClick={() => navigate('/benefits')}>
                        <ListItemIcon>
                            <LoyaltyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Beneficios" />
                    </ListItem>
                    <ListItem onClick={() => navigate('/tips')}>
                        <ListItemIcon>
                            <TipsAndUpdatesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tips" />
                    </ListItem>
                    <ListItem onClick={() => navigate('/profile')}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Perfil" />
                    </ListItem>
                    {user?.email === 'nicolasminahk@gmail.com' && (
                        <ListItem onClick={() => navigate('/admin')}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admin" />
                        </ListItem>
                    )}
                </List>
            </nav>
            <Divider />
            <nav>
                <List>
                    <ListItem disablePadding onClick={() => navigate('/about')}>
                        <ListItemButton component="a" href="#link">
                            <ListItemText primary="Sobre Nosotros" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    )
}

export default NavList
