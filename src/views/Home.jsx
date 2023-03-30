import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CalendarComponent from '../components/CalendarComponent'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'
import { gql, useMutation, useQuery } from '@apollo/client'
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

const CREATE_USER = gql`
    mutation Mutation($createUserId: ID!, $email: String!) {
        createUser(id: $createUserId, email: $email) {
            id
            email
        }
    }
`
function extractNumbers(inputString) {
    return inputString.replace(/\D/g, '')
}
const Home = () => {
    const { loading, error, data } = useQuery(ALL_SALIDAS)
    const { loginWithRedirect, user, isAuthenticated } = useAuth0()
    const [userId, setUserID] = useState('')
    const [email, setEmail] = useState('')
    console.log(isAuthenticated, user)

    // const [createUser] = useMutation(CREATE_USER, {
    //     variables: {
    //         id: userId,
    //         email: email,
    //     },
    // })
    // useEffect(() => {
    //     const userIdDepure = extractNumbers(user?.sub)
    //     setUserID(userIdDepure)
    //     setEmail(user.email)
    //     createUser()
    //     console.log('effect', userId, email)
    // }, [user])
    // console.log(userId)

    // const handleCreate = () => {
    //     createUser()
    // }
    if (loading) return null

    return (
        <Box sx={{ backgroundImage: 'linear-gradient(to bottom right, #8BC34A, #CDDC39)' }}>
            <Navbar />
            <Box
                sx={{
                    flexDirection: 'row',
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
            <CalendarComponent activities={data?.allSalidas} />
            <div style={{ paddingTop: '400px' }}></div>

            <Footer />
        </Box>
    )
}

export default Home
