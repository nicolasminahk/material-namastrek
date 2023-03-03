import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import ExitView from './ExitView'
import { Box, Grid } from '@mui/material'

const ALL_SALIDAS = gql`
    query AllSalidas {
        allSalidas {
            date
            description
            id
            name
            price
        }
    }
`

const ExitsList = () => {
    const { loading, error, data } = useQuery(ALL_SALIDAS)
    console.log(data)
    return (
        <>
            {data?.allSalidas.map((view) => {
                return (
                    <ExitView name={view.name} description={view.description} price={view.price} image={view.image} />
                )
            })}
        </>
    )
}

export default ExitsList
