import * as React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, Box, MenuItem, Menu } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NavList from './NavList'
import { LoginButton } from '../Login'
import { LogoutButtom } from '../Logout'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import logo from '../../assets/namastrek.png'

function Navbar() {
    const [drawer, setDrawer] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const { user, isAuthenticated, isLoading } = useAuth0()

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar style={{ backgroundColor: '#689F38' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={logo} alt="Company Logo" style={{ height: 50, marginRight: 'auto', marginLeft: 16 }} />
                    <Box>
                        {!isAuthenticated && (
                            <Button color="inherit" component={Link} to="/login">
                                <LoginButton />
                            </Button>
                        )}
                        {isAuthenticated && (
                            <React.Fragment>
                                <IconButton color="inherit" onClick={handleMenu}>
                                    <PersonPinIcon />
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                    <MenuItem onClick={handleClose} component={Link} to="/profile">
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} to="/logout">
                                        <LogoutButtom />
                                    </MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer open={drawer} onClose={() => setDrawer(false)}>
                <NavList />
            </Drawer>
        </Box>
    )
}
export default Navbar
