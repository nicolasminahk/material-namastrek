import React, { useState } from 'react'
import { Box, Typography, Card, CardContent, CardMedia, Button, Divider } from '@mui/material'
import { useSpring, animated } from 'react-spring'
import backgroundImage from '../assets/paisaje3.png'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import toast, { Toaster } from 'react-hot-toast'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const ADD_PERSON_EXIT = gql`
    mutation AddPersonExit($salida: String!, $auth0UserId: String!) {
        addPersonExit(salida: $salida, auth0UserId: $auth0UserId) {
            name
            date
            id
            price
        }
    }
`
const FIND_DATA_BY_AUTHUSERID = gql`
    query FindDataByAuth0UserId($auth0UserId: String!) {
        findDataByAuth0UserId(auth0UserId: $auth0UserId) {
            adress
            tipoSangre
            name
        }
    }
`
const FIND_EXIT_BY_AUHT0 = gql`
    query FindSalidasByAuth0UserId($auth0UserId: String!) {
        findSalidasByAuth0UserId(auth0UserId: $auth0UserId) {
            id
            name
        }
    }
`
function extractNumbers(inputString) {
    return inputString?.replace(/\D/g, '')
}

const decodeImage = (image) => {
    if (!image) return null
    const binary = atob(image)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)
    }
    const blob = new Blob([bytes], { type: 'image/jpeg' })
    return URL.createObjectURL(blob)
}

function ExitView({ name, description, image, price, date, id, linkImage }) {
    const [hovered, setHovered] = React.useState(false)
    const [idSalida, setIdSalida] = useState('')
    const { user, isAuthenticated, error: errorAuth0, isLoading: loadingAuth0 } = useAuth0()
    const userDepure = extractNumbers(user?.sub)
    const {
        loading: loadingData,
        error: errorData,
        data: userData,
    } = useQuery(FIND_DATA_BY_AUTHUSERID, {
        variables: {
            auth0UserId: userDepure,
        },
    })
    const {
        loading: loadingExit,
        error: errorExit,
        data: dataExit,
    } = useQuery(FIND_EXIT_BY_AUHT0, {
        variables: {
            auth0UserId: userDepure,
        },
    })

    const [addPersonExit] = useMutation(ADD_PERSON_EXIT, {
        variables: {
            auth0UserId: userDepure,
            salida: idSalida,
        },
    })

    const hoverAnimation = useSpring({
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? '0px 10px 20px rgba(0, 0, 0, 0.2)' : 'none',
    })
    const handleExitUser = () => {
        const exitId = idSalida
        const userExits = dataExit?.findSalidasByAuth0UserId || []
        if (userExits.some((exit) => exit.id === exitId)) {
            notify('Ya estás registrado para esta salida')
        } else {
            addPersonExit()
            notify('Te has registrado exitosamente')
        }
    }

    const notify = (message) => toast.success(message)
    const notifyError = (message) => toast.error(message)
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '10px',
                overflow: 'hidden',
                padding: '10px',
                margin: '10px',
                border: '1px solid #ffff',
                '@media (max-width: 768px)': {
                    padding: '10px',
                    margin: '5px',
                },
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <animated.div style={hoverAnimation}>
                <Card
                    variant="outlined"
                    sx={{
                        maxWidth: 380,
                        backgroundColor: 'transparent',
                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
                        borderRadius: 12,
                    }}
                >
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'white',
                            flexGrow: 1,
                            justifyContent: 'space-between',
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="100%"
                            image={image ? decodeImage(image) : backgroundImage}
                            alt="output"
                            style={{ objectFit: 'cover', borderRadius: 30 }}
                        />

                        <Typography variant="h6" sx={{ mb: 2, color: 'green', paddingTop: '5px', fontWeight: 'bold' }}>
                            {name}
                        </Typography>
                        <Divider />

                        <Typography
                            variant="body2"
                            sx={{ mb: 2, color: 'green', fontSize: 'italic' }}
                            style={{ whiteSpace: 'pre-line' }}
                        >
                            {description}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, color: 'green', fontSize: 'italic' }}>
                            {date}
                        </Typography>
                        {linkImage && (
                            <Typography variant="body1" sx={{ mb: 2, color: 'green' }}>
                                Más imagenes
                                <Button onClick={() => window.open(linkImage)}>
                                    <AddCircleIcon color="success" />
                                </Button>
                            </Typography>
                        )}
                        <Typography variant="body2" sx={{ mb: 2, color: 'green', fontWeight: 'bold' }}>
                            Precio: {price}
                        </Typography>
                        <Divider />

                        {user && (
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                    mt: 2,
                                    alignSelf: 'flex-end',
                                    borderRadius: 50,
                                    '@media (max-width:600px)': { alignSelf: 'center', mt: 4 },
                                }}
                                onClick={() => {
                                    setIdSalida(id)
                                    if (userData?.findDataByAuth0UserId) {
                                        handleExitUser()
                                    } else {
                                        notifyError('Debe completar el formulario de contacto que figura en su perfil')
                                    }
                                }}
                            >
                                Reservar Ahora
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </animated.div>
            <Toaster />
        </Box>
    )
}

export default ExitView
