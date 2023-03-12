import { Box } from '@mui/material'
import React from 'react'
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
                <AdminProfile />
            </Box>
            <Footer />
        </div>
    )
}

export default Admin
