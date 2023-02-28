import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { Inbox } from '@mui/icons-material'
import HikingIcon from '@mui/icons-material/Hiking'
import LoyaltyIcon from '@mui/icons-material/Loyalty'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useNavigate } from 'react-router-dom'

const NavList = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ width: 250, borderRadius: 3 }}>
            <nav>
                <List>
                    <ListItem onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <Inbox />
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
                </List>
            </nav>
            <Divider />
            <nav>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#link">
                            <ListItemText primary="guardar" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    )
}

export default NavList
