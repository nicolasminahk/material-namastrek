import React from 'react'
import { Box, Typography, Button, Modal } from '@mui/material'
import { styled } from '@mui/material/styles'
import Navbar from '../components/navbar/Navbar'
import UserProfile from '../components/UserProfile'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import { useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <UserProfileContainer>
                <>
                    <Typography>Para poder realizar Actividades debe llenar el siguiente formulario:</Typography>
                    <Button onClick={() => navigate('/form')}>Formulario</Button>
                </>
                <UserProfile />
            </UserProfileContainer>
            <Footer />
        </>
    )
}

export default Profile
