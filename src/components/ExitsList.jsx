import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import ExitView from './ExitView'
import { Box, Grid, useTheme } from '@mui/material'
import backgroundImage from '../assets/paisaje3.png'

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

const ExitsList = () => {
    const { loading, error, data } = useQuery(ALL_SALIDAS)
    console.log('daata', data?.allSalidas)
    const theme = useTheme()

    return (
        <>
            <Box
                sx={{
                    bgcolor: '#F3F6F9',
                    pt: theme.spacing(10),
                    pb: theme.spacing(6),
                    [theme.breakpoints.up('md')]: {
                        pt: theme.spacing(15),
                        pb: theme.spacing(10),
                    },
                    [theme.breakpoints.up('lg')]: {
                        pt: theme.spacing(20),
                        pb: theme.spacing(12),
                    },
                    marginTop: '4rem',
                    [theme.breakpoints.down('sm')]: {
                        marginTop: '2rem',
                    },
                }}
            >
                {data?.allSalidas.map((view) => {
                    return (
                        <ExitView
                            name={view.name}
                            id={view.id}
                            description={view.description}
                            price={view.price}
                            image={
                                // 'https://img.freepik.com/foto-gratis/fondo-paisaje-montanas-ilustracion-puesta-sol_53876-105317.jpg?w=1800&t=st=1678219849~exp=1678220449~hmac=f5c53643de94674bf7f0bdbcb527a355d72a5a9d74dbd65f61f9788332e7db73'
                                decodeImage(view.image)
                            }
                        />
                    )
                })}
            </Box>
        </>
    )
}

export default ExitsList
