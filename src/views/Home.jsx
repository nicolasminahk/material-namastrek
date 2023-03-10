import { Box, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import CalendarComponent from '../components/CalendarComponent'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'

const activities = [
    {
        title: 'Actividad 1',
        date: '2023-03-15',
        description: 'Descripción de la actividad 1',
    },
    {
        title: 'Actividad 2',
        date: '2023-03-20',
        description: 'Descripción de la actividad 2',
    },
    {
        title: 'Actividad 3',
        date: '2023-03-22',
        description: 'Descripción de la actividad 3',
    },
    {
        title: 'Actividad 4',
        date: '2023-03-28',
        description: 'Descripción de la actividad 4',
    },
]
const Home = () => {
    return (
        <>
            <Navbar />
            <Box sx={{ flexDirection: 'row', marginTop: '100px' }}>
                <Typography
                    variant="h4"
                    sx={{
                        color: '#4CAF50',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: '2rem',
                        fontFamily: 'Roboto, sans-serif',
                        textShadow: '1px 1px rgba(0, 0, 0, 0.2)',
                        letterSpacing: '2px',
                        animation: 'pulse 2s ease-in-out infinite',
                    }}
                >
                    Busca <br /> tu mejor <br /> Aventura!
                </Typography>
            </Box>
            <CalendarComponent activities={activities} />
            <div style={{ paddingTop: '400px' }}>
                <Footer />
            </div>
        </>
    )
}

export default Home
