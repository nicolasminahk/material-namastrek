import { Box, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import CalendarComponent from '../components/CalendarComponent'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'

const ALL_SALIDAS = gql`
    query AllSalidas {
        allSalidas {
            date
            description
            id
            name
            price
            image
        }
    }
`

const CREATE_USER = gql`
    mutation Mutation($id: String!, $email: String!) {
        createUser(id: $id, email: $email) {
            _id
            email
        }
    }
`
function extractNumbers(inputString) {
    return inputString?.replace(/\D/g, '')
}
const Home = () => {
    const { loading: loadingSalidas, error: errorSalidas, data } = useQuery(ALL_SALIDAS)
    const { user, isAuthenticated, error: errorAuth0, isLoading: loadingAuth0 } = useAuth0()

    const userData = useMemo(() => ({ id: extractNumbers(user?.sub) ?? '', email: user?.email ?? '' }), [user])

    const [createUser, { error: createUserError }] = useMutation(CREATE_USER, {
        variables: userData,
        onError: (error) => console.log('createUser error:', createUserError),
    })

    useEffect(() => {
        const generateUser = async () => {
            if (user && isAuthenticated && userData.id) {
                createUser()
            }
        }
        generateUser()
    }, [user, createUser, userData])

    if (loadingSalidas && loadingAuth0) {
        return <>Cargando...</>
    }
    if (errorSalidas && errorAuth0) {
        return <>error: {(errorSalidas, '\n', errorAuth0)}</>
    }

    return (
        <>
            <Box
                sx={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/fondoFinal.gif)`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    marginTop: '-40px',
                }}
            >
                {/* <Box
                sx={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/fondoTextura.png)`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh', // Asegura que el contenedor ocupe el 100% de la altura de la pantalla
                    display: 'flex', // Utiliza flexbox para ajustar el contenido verticalmente
                    flexDirection: 'column', // Ajusta el contenido verticalmente
                    justifyContent: 'center', // Centra verticalmente el contenido
                    alignItems: 'center', // Centra horizontalmente el contenido
                    // Ajusta el tamaño y posición de la imagen de fondo para vista web
                    '@media (min-width: 768px)': {
                        backgroundSize: 'cover', // Tamaño normal de la imagen para vista web
                        backgroundPosition: 'center top', // Ajusta la posición de la imagen centrada verticalmente y alineada en la parte superior
                    },
                    // Ajusta el tamaño y posición de la imagen de fondo para vista móvil
                    '@media (max-width: 767px)': {
                        backgroundSize: 'cover', // Tamaño normal de la imagen para vista móvil
                        backgroundPosition: 'center bottom', // Ajusta la posición de la imagen centrada verticalmente y alineada en la parte inferior
                        height: '100%', // Ocupa toda la altura del contenedor en vista móvil
                        width: '100%', // Ocupa todo el ancho del contenedor en vista móvil
                    },
                }}
            > */}
                <Navbar />
                <Box
                    sx={{
                        flexDirection: 'row',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            // color: '#E5F6E5',
                            color: 'black',
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
                        {/* Busca tu mejor <br /> Aventura! */}
                    </Typography>
                </Box>
                <CalendarComponent activities={data?.allSalidas} />
                <div style={{ paddingTop: '400px' }}></div>

                <Footer />
            </Box>
        </>
    )
}

export default Home
