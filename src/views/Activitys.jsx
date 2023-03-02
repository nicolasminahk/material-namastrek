import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import ExitView from '../components/ExitView'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'

const Activitys = () => {
    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pt: 8,
                    backgroundColor: '#F7F7F7',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h3" sx={{ color: '#3F704D', mb: 6, fontWeight: 'bold' }}>
                    Salidas
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '600px',
                        bgcolor: '#FFFFFF',
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                        borderRadius: '10px',
                        padding: '30px',
                        mb: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 4,
                        mx: 3,
                        '@media (min-width: 600px)': {
                            mx: 'auto',
                        },
                    }}
                >
                    <ExitView />
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Activitys
