import { Box, Typography } from '@mui/material'
import React from 'react'
import AdminBenefit from '../components/AdminBenefit'
import AdminExit from '../components/AdminExit'
import AdminProfile from '../components/AdminProfile'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'

const Admin = () => {
    return (
        <div>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pt: 8,
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h3" sx={{ color: '#3F704D', mb: 6, fontWeight: 'bold', paddingTop: '25px' }}>
                    Administrador
                </Typography>
                <AdminExit />
                <AdminProfile />
                <AdminBenefit />
            </Box>
            <Footer />
        </div>
    )
}

export default Admin
