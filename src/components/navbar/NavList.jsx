import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { Inbox } from '@mui/icons-material'

const NavList = () => {
    return (
        <Box sx={{ width: 250, borderRadius: 3 }}>
            <nav>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <Inbox />
                        </ListItemIcon>
                        <ListItemText primary="Menu" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Inbox />
                        </ListItemIcon>
                        <ListItemText primary="Salidas" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Inbox />
                        </ListItemIcon>
                        <ListItemText primary="Beneficios" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Inbox />
                        </ListItemIcon>
                        <ListItemText primary="Tips" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Inbox />
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
