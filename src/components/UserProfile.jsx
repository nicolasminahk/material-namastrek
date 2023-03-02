import React from 'react'
import { Carousel } from 'react-responsive-carousel'
// import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Typography, Box, Card, CardContent } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'

function UserProfile({ name, outputs, benefits }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography>Tu perfil</Typography>
            <Typography variant="h4" sx={{ mb: 4 }}>
                {name}
            </Typography>
            <Card variant="outlined" sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Salidas
                    </Typography>
                    <Carousel>
                        {outputs?.map((output, index) => (
                            <div key={index}>
                                <img src={output.image} alt={output.title} />
                                <Typography variant="body1">{output.title}</Typography>
                            </div>
                        ))}
                    </Carousel>
                </CardContent>
            </Card>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Beneficios
                    </Typography>
                    <Carousel>
                        {benefits?.map((benefit, index) => (
                            <div key={index}>
                                <img src={benefit.image} alt={benefit.title} />
                                <Typography variant="body1">{benefit.title}</Typography>
                            </div>
                        ))}
                    </Carousel>
                </CardContent>
            </Card>
        </Box>
    )
}

export default UserProfile
