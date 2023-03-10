import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'

export const LogoutButtom = () => {
    const { logout } = useAuth0()

    return <Button onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
}
