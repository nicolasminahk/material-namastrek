import React from 'react'
import { Typography, Box, IconButton } from '@mui/material'
import { Facebook, WhatsApp } from '@mui/icons-material'

function Footer() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E5F6E5',
                py: 2,
                '& > *': {
                    margin: '0 10px',
                },
                '@media screen and (max-width: 600px)': {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    '& > *': {
                        margin: '10px 0',
                    },
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Typography sx={{ flexGrow: 1, fontWeight: 'bold', mr: 2 }}>Namastrek</Typography>
                <IconButton
                    aria-label="Facebook"
                    onClick={() => window.open('https://www.facebook.com/namastrekk')}
                    sx={{ mr: 1 }}
                >
                    <Facebook />
                </IconButton>
                <IconButton aria-label="WhatsApp" onClick={() => window.open(process.env.REACT_APP_WAME)}>
                    <WhatsApp />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 2 }}>Hecho con ❤️ por el equipo de Namastrek</Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>© 2023 All rights reserved</Typography>
            </Box>
        </Box>
    )
}

export default Footer
