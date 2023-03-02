import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import Navbar from '../components/navbar/Navbar'
import UserProfile from '../components/UserProfile'
import Footer from '../components/Footer'

const UserProfileContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',

    alignItems: 'center',
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(4),
    backgroundImage: 'linear-gradient(to bottom right, #8BC34A, #CDDC39)',
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
            <Footer />
        </>
    )
}

export default Profile
