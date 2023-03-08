import React from 'react'
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material'
import { Rating } from '@mui/material'
import { useSpring, animated } from 'react-spring'
import backgroundImage from '../assets/paisaje3.png'

function ExitView({ name, description, image, price, rating }) {
    const [hovered, setHovered] = React.useState(false)

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
                // backgroundImage: `url(${image})`,
                // backgroundImage: backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '10px',
                overflow: 'hidden',
                padding: '20px',
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
                        maxWidth: 400,
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
