import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import Navbar from '../components/navbar/Navbar'
import { Facebook, WhatsApp } from '@mui/icons-material'
import InstagramIcon from '@mui/icons-material/Instagram'
import logo from '../assets/namastrek.png'

const AboutUs = () => {
    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundImage: 'linear-gradient(to bottom right, #8BC34A, #CDDC39)',
                }}
            >
                <img
                    src={logo}
                    alt="Company Logo"
                    style={{ width: 320, height: 200, borderRadius: 30, paddingBottom: 20 }}
                />

                <Box sx={{ my: 3 }}>{/* <CompanyLogo width="150" height="150" /> */}</Box>
                <Typography variant="h4" fontFamily={'fantasy'} sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
                    "Camina besando la tierra con tus pies"
                </Typography>
                <Typography variant="body1" sx={{ color: 'black', textAlign: 'center', mb: 4 }}>
                    Somos una empresa dedicada a promover las actividades al aire libre y la exploración de la
                    naturaleza.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                        aria-label="Facebook"
                        onClick={() => window.open('https://www.facebook.com/namastrekk')}
                        sx={{ mr: 1 }}
                        size="large"
                    >
                        <Facebook />
                    </IconButton>
                    <IconButton
                        aria-label="Facebook"
                        onClick={() => window.open('https://www.instagram.com/namastrek/')}
                        sx={{ mr: 1 }}
                        size="large"
                    >
                        <InstagramIcon />
                    </IconButton>
                    <IconButton
                        aria-label="WhatsApp"
                        size="large"
                        onClick={() => window.open('https://wa.me/+543814012014?text=Hola!')}
                    >
                        <WhatsApp />
                    </IconButton>
                </Box>
            </Box>
        </>
    )
}

export default AboutUs
