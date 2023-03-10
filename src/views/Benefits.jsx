import { Box, Typography } from '@mui/material'
import React from 'react'
import BenefitsList from '../components/BenefitsList'
import Navbar from '../components/navbar/Navbar'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Button } from 'react-day-picker'

const ALL_BENEFICIOS = gql`
    query AllBeneficios {
        allBeneficios {
            date
            description
            id
            name
        }
    }
`

const Benefits = () => {
    const { loading, error, data } = useQuery(ALL_BENEFICIOS)
    if (loading) return null
    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pt: 8,
                    backgroundColor: '#F7F7F7',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h3" sx={{ color: '#3F704D', mb: 6, fontWeight: 'bold' }}>
                    My Benefits
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '600px',
                        bgcolor: '#FFFFFF',
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                        borderRadius: '10px',
                        padding: '10px',
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
                        margin: '0 auto',
                        marginTop: 4,
                    }}
                >
                    {data?.allBeneficios?.map((benefit) => (
                        <BenefitsList benefits={benefit} key={benefit.id} />
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default Benefits
