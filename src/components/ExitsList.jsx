import React from 'react'
import { gql, useQuery } from '@apollo/client'
import ExitView from './ExitView'
import { Box, useTheme } from '@mui/material'

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
                            image={decodeImage(view.image)}
                        />
                    )
                })}
            </Box>
        </>
    )
}

export default ExitsList
