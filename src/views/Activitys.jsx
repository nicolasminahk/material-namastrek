import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom'

import ExitView from '../components/ExitView'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'

const ALL_SALIDAS = gql`
    query AllSalidas {
        allSalidas {
            date
            description
            id
            name
            price
            image
            linkImage
        }
    }
`

const Activitys = () => {
    const { loading, error, data } = useQuery(ALL_SALIDAS)
    const location = useLocation()
    const cardRef = useRef(null)
    console.log('Salidas', data?.allSalidas)
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search)
        const salidaId = urlSearchParams.get('id')
        console.log('salidaId:', salidaId)
        if (salidaId && cardRef.current) {
            cardRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [location.search])
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
                                        height: '100%',
                                    }}
                                    // ref={view.id.toString() === location.search.split('=')[1] ? cardRef : null}
                                    ref={view.id && view.id.toString() === view.id ? cardRef : null}
                                    key={view.id}
                                >
                                    <ExitView
                                        name={view.name}
                                        description={view.description}
                                        price={view.price}
                                        image={view.image}
                                        date={view.date}
                                        linkImage={view.linkImage}
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
