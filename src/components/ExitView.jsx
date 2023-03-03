import React from 'react'
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material'
import { Rating } from '@mui/material'
import { useSpring, animated } from 'react-spring'

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
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#ECEFF1',
                borderRadius: '10px',
                overflow: 'hidden',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <animated.div style={hoverAnimation}>
                <Card variant="outlined" sx={{ maxWidth: 600, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            {name}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            {description}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
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
