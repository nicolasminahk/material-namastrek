import * as React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NavList from './NavList'

function Navbar() {
    const [drawer, setDrawer] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ bgcolor: '#fff' }}>
                <Toolbar>
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Namastrek
                    </Typography>
                    <Box>
                        {/* {!user.email && (
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
              )}
              {user.email && (
                <React.Fragment>
                  <IconButton color="inherit" onClick={handleMenu}>
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose} component={Link} to="/profile">
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/logout">
                      Logout
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )} */}
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
