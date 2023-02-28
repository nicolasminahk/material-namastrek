import { Box, Typography } from '@mui/material'
import React from 'react'
import BenefitsList from '../components/BenefitsList'
import Navbar from '../components/navbar/Navbar'

const Benefits = () => {
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
                    My Benefits
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '600px',
                        bgcolor: '#FFFFFF',
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                        borderRadius: '10px',
                        padding: '10px',
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
                    <BenefitsList />
                </Box>
            </Box>
        </>
    )
}

export default Benefits
