import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { gql, useQuery, useMutation } from '@apollo/client'

import ExitView from '../components/ExitView'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'
import { Buffer } from 'buffer'

const ALL_SALIDAS = gql`
    query AllSalidas {
        allSalidas {
            date
            description
            id
            name
            price
        }
    }
`
const decodeImage = (image) => {
    if (!image) return null // Agregamos la verificación aquí
    const buffer = new Buffer.from(image, 'base64')
    return buffer.toString('ascii')
}

const Activitys = () => {
    const { loading, error, data } = useQuery(ALL_SALIDAS)
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
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h3" sx={{ color: '#3F704D', mb: 6, fontWeight: 'bold', paddingTop: '25px' }}>
                    Salidas
                </Typography>
                <Box
                    sx={{
                        flex: 1,
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
                        flexWrap: 'wrap',
                        '@media (min-width: 600px)': {
                            mx: 'auto',
                        },
                    }}
                >
                    <>
                        {data?.allSalidas.map((view) => {
                            return (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%', // Agregado para asegurar que todas las cards tengan la misma altura
                                    }}
                                >
                                    <ExitView
                                        name={view.name}
                                        description={view.description}
                                        price={view.price}
                                        image={decodeImage(view.image)}
                                        date={view.date}
                                        id={view.id}
                                    />
                                </Box>
                            )
                        })}
                    </>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Activitys
