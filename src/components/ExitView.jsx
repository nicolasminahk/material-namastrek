import React, { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material'
import { Rating } from '@mui/material'
import { useSpring, animated } from 'react-spring'
import backgroundImage from '../assets/paisaje3.png'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'

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
function extractNumbers(inputString) {
    return inputString?.replace(/\D/g, '')
}

function ExitView({ name, description, image, price, date, id }) {
    const [hovered, setHovered] = React.useState(false)
    const [idSalida, setIdSalida] = useState('')
    const { user, isAuthenticated, error: errorAuth0, isLoading: loadingAuth0 } = useAuth0()
    const userDepure = extractNumbers(user?.sub)
    console.log(userDepure)
    console.log(idSalida)

    const [addPersonExit] = useMutation(ADD_PERSON_EXIT, {
        variables: {
            auth0UserId: userDepure,
            salida: idSalida,
        },
    })

    // useEffect(() => {
    //     addPersonExit()
    // }, [idSalida])

    const hoverAnimation = useSpring({
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? '0px 10px 20px rgba(0, 0, 0, 0.2)' : 'none',
    })
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
                            image={backgroundImage}
                            alt="output"
                            style={{ objectFit: 'cover', borderRadius: 30 }}
                        />

                        <Typography variant="h4" sx={{ mb: 2, color: 'green', paddingTop: '5px' }}>
                            {name}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, color: 'green' }}>
                            {description}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, color: 'green' }}>
                            {date}
                        </Typography>
                        {/* <Typography variant="body1" sx={{ mb: 2, color: 'green' }}>
                            {id}
                        </Typography> */}
                        <Typography variant="body1" sx={{ mb: 2, color: 'green' }}>
                            Price: {price}
                        </Typography>
                        {/* <Typography variant="body1" sx={{ mb: 2 }}>
                            Rating: <Rating value={rating} precision={0.5} readOnly />
                        </Typography> */}
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{
                                mt: 2,
                                alignSelf: 'flex-end',
                                '@media (max-width:600px)': { alignSelf: 'center', mt: 4 },
                            }}
                            onClick={() => {
                                setIdSalida(id)
                                addPersonExit()
                            }}
                        >
                            Reservar Ahora
                        </Button>
                    </CardContent>
                </Card>
            </animated.div>
        </Box>
    )
}

export default ExitView
