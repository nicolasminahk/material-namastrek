import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import ExitView from './ExitView'
import { Box, Grid } from '@mui/material'
import backgroundImage from '../assets/paisaje3.png'

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
                    <ExitView
                        name={view.name}
                        description={view.description}
                        price={view.price}
                        image={
                            'https://img.freepik.com/foto-gratis/fondo-paisaje-montanas-ilustracion-puesta-sol_53876-105317.jpg?w=1800&t=st=1678219849~exp=1678220449~hmac=f5c53643de94674bf7f0bdbcb527a355d72a5a9d74dbd65f61f9788332e7db73'
                        }
                    />
                )
            })}
        </>
    )
}

export default ExitsList
