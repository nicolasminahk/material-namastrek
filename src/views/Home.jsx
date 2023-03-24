import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import CalendarComponent from '../components/CalendarComponent'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'
import { gql, useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import dayjs from 'dayjs'
import LeafModel from '../components/LeafModel'

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
// const activities = [
//     {
//         title: 'Actividad 1',
//         date: '2023-03-15',
//         description: 'Descripción de la actividad 1',
//     },
//     {
//         title: 'Actividad 2',
//         date: '2023-03-20',
//         description: 'Descripción de la actividad 2',
//     },
//     {
//         title: 'Actividad 3',
//         date: '2023-03-22',
//         description: 'Descripción de la actividad 3',
//     },
//     {
//         title: 'Actividad 4',
//         date: '2023-03-28',
//         description: 'Descripción de la actividad 4',
//     },
// ]

//FILTER AQUI PARA ENVIAR AL CALENDARIO
const Home = () => {
    const { loading, error, data } = useQuery(ALL_SALIDAS)
    const { loginWithRedirect, user, isAuthenticated } = useAuth0()
    console.log(isAuthenticated, user)
    if (loading) return null
    const currentDate = dayjs()
    const activities = data?.allSalidas.filter((activity) => activity.date === currentDate.toISOString().slice(0, 10))
    console.log(activities)

    return (
        <Box sx={{ backgroundImage: 'linear-gradient(to bottom right, #8BC34A, #CDDC39)' }}>
            <Navbar />
            <Box
                sx={{
                    flexDirection: 'row',
                    // marginTop: '100px',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: '#E5F6E5',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: '2rem',
                        fontFamily: 'Roboto, sans-serif',
                        textShadow: '1px 1px rgba(0, 0, 0, 0.2)',
                        letterSpacing: '2px',
                        animation: 'pulse 2s ease-in-out infinite',
                        paddingTop: '80px',
                    }}
                >
                    Busca tu mejor <br /> Aventura!
                </Typography>
            </Box>
            <CalendarComponent activities={activities} />
            <div style={{ paddingTop: '400px' }}></div>

            <Footer />
        </Box>
    )
}

export default Home
