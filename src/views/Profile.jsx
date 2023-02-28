import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import Navbar from '../components/navbar/Navbar'
import UserProfile from '../components/UserProfile'

const UserProfileContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(4),
    backgroundImage: 'linear-gradient(to bottom, #9fdcd3, #1ebca0)',
    animation: 'fadeIn 1s ease-in-out',
    animationFillMode: 'forwards',
}))

const Profile = () => {
    return (
        <>
            <Navbar />
            <UserProfileContainer>
                <UserProfile />
            </UserProfileContainer>
        </>
    )
}

export default Profile
