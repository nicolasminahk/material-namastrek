import React, { useState } from 'react'
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import NavBar from '../components/navbar/Navbar'
import { gql, useQuery, useMutation } from '@apollo/client'
import fondoTip from '../assets/fondoTip.png'
import { useSpring, animated } from 'react-spring'

const ALL_TIPS = gql`
    query AllTips {
        allTips {
            description
            id
            name
        }
    }
`

const TipsView = () => {
    const [hovered, setHovered] = React.useState(false)

    const hoverAnimation = useSpring({
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? '0px 10px 20px rgba(0, 0, 0, 0.2)' : 'none',
    })
    const { loading, error, data } = useQuery(ALL_TIPS)
    if (loading) return null
    return (
        <>
            <NavBar />
            <Box sx={{ bgcolor: '#F3F6F9', pt: { xs: 10, md: 15 }, pb: { xs: 6, md: 10 }, marginTop: '4rem' }}>
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    fontWeight="bold"
                    color="#2D5F5E"
                    sx={{ mb: { xs: 5, md: 10 }, fontFamily: 'Montserrat, sans-serif' }}
                >
                    Consejos para un buen viaje
                </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
                {data?.allTips?.map((tip) => (
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
                            '@media (min-width: 600px)': {
                                mx: 'auto',
                            },
                        }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <Card>
                            <animated.div style={hoverAnimation}>
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        style={{
                                            mb: { xs: 5, md: 10 },
                                            fontSize: '',
                                            fontFamily: 'Montserrat, sans-serif',
                                            color: 'green',
                                            fontVariant: 'all-petite-caps',
                                        }}
                                    >
                                        {tip.name}
                                    </Typography>
                                    <Typography style={{ fontVariant: 'all-small-caps' }}>{tip.description}</Typography>
                                    <Typography>{tip.date}</Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={fondoTip}
                                    alt="output"
                                    style={{ objectFit: 'cover', borderRadius: 30 }}
                                />
                            </animated.div>
                        </Card>
                    </Box>
                ))}
            </Grid>
        </>
    )
}

export default TipsView

// <Grid container spacing={3} justifyContent="center">
// <Box
//     sx={{
//         flex: 1,
//         width: '100%',
//         maxWidth: '600px',
//         bgcolor: '#FFFFFF',
//         boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
//         borderRadius: '10px',
//         padding: '30px',
//         mb: 8,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         mt: 4,
//         mx: 3,
//         '@media (min-width: 600px)': {
//             mx: 'auto',
//         },
//     }}
// >
//     {/* <BenefitsList benefits={data.allTips} /> */}
// </Box>
// </Grid>
