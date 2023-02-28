import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import NavBar from '../components/navbar/Navbar'
// import TipsList from './TipsList';

const TipsView = () => {
    return (
        <>
            <NavBar />
            <Box sx={{ bgcolor: '#F3F6F9', pt: { xs: 10, md: 15 }, pb: { xs: 6, md: 10 }, marginTop: '4rem' }}>
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    fontWeight="bold"
                    color="#2D5F5E"
                    sx={{ mb: { xs: 5, md: 10 }, fontFamily: 'Montserrat, sans-serif' }}
                >
                    Consejos para un buen viaje
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {/* <TipsList /> */}
                </Grid>
            </Box>
        </>
    )
}

export default TipsView
