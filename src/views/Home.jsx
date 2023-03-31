import { Box, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
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

    const [createUser, { error: createUserError }] = useMutation(CREATE_USER, {
        variables: {
            id: userId,
            email: email,
        },
        onError: (error) => console.log('createUser error:', error),
    })

    if (isAuthenticated) {
        createUser()
    }

    useEffect(() => {
        if (user) {
            const userIdDepure = extractNumbers(user.sub)
            setUserID(userIdDepure)
            setEmail(user.email)
        }
    }, [user])

    // const ALL_SALIDAS = gql`
    //     query AllSalidas {
    //         allSalidas {
    //             date
    //             description
    //             id
    //             name
    //             price
    //         }
    //     }
    // `

    // const CREATE_USER = gql`
    //     mutation Mutation($createUserId: ID!, $email: String!) {
    //         createUser(id: $createUserId, email: $email) {
    //             id
    //             email
    //         }
    //     }
    // `
    // function extractNumbers(inputString) {
    //     return inputString.replace(/\D/g, '')
    // }
    // const Home = () => {
    //     const { loading: loadingSalidas, error: errorSalidas, data } = useQuery(ALL_SALIDAS)
    //     const { user, isAuthenticated, error: errorAuth0, isLoading: loadingAuth0 } = useAuth0()

    //     const userData = useMemo(() => ({ id: extractNumbers(user?.sub), email: user?.email }), [user])

    //     const [createUser, { error: createUserError }] = useMutation(CREATE_USER, {
    //         variables: userData,
    //         onError: (error) => console.log('createUser error:', error),
    //     })

    //     useEffect(() => {
    //         const generateUser = async () => {
    //             console.log({ user, isAuthenticated })
    //             if (user && isAuthenticated) await createUser()
    //         }
    //         generateUser()
    //     }, [user, createUser])

    //     if (loadingSalidas && loadingAuth0) {
    //         return <>Cargando...</>
    //     }
    //     if (errorSalidas && errorAuth0) {
    //         return <>error: {(errorSalidas, '\n', errorAuth0)}</>
    //     }
    //     // if (loading) return null

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
