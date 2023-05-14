import React, { useState } from 'react'
import { Typography, Box, Card, CardContent, ListItem, List, Button } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { gql, useMutation, useQuery } from '@apollo/client'
import toast, { Toaster } from 'react-hot-toast'

const FIND_SALIDAS_BY_AUTH0USERID = gql`
    query FindSalidasByAuth0UserId($auth0UserId: String!) {
        findSalidasByAuth0UserId(auth0UserId: $auth0UserId) {
            name
            date
            users
            id
        }
    }
`
const FIND_BENEFITS_BY_AUTH0USERID = gql`
    query FindBenefitByAuth0UserId($auth0UserId: String!) {
        findBenefitByAuth0UserId(auth0UserId: $auth0UserId) {
            name
            description
        }
    }
`

const REMOVE_PERSON_ON_EXIT = gql`
    mutation Mutation($salida: String!, $auth0UserId: String!) {
        removePersonExit(salida: $salida, auth0UserId: $auth0UserId) {
            name
            id
        }
    }
`

function extractNumbers(inputString) {
    return inputString?.replace(/\D/g, '')
}

function UserProfile({ name, benefits }) {
    const [outputs, setOutputs] = useState('')
    const [idSalida, setIdSalida] = useState('')
    const { user, isAuthenticated, error: errorAuth0, isLoading: loadingAuth0 } = useAuth0()
    const userDepure = extractNumbers(user?.sub)
    const {
        loading: loadingSalidas,
        error: errorSalidas,
        data: dataSalidas,
        refetch: refetchSalidas,
    } = useQuery(FIND_SALIDAS_BY_AUTH0USERID, {
        variables: { auth0UserId: userDepure },
    })
    const {
        loading: loadingBeneficios,
        error: errorBeneficios,
        data: dataBeneficios,
        refetch: refetchBeneficios,
    } = useQuery(FIND_BENEFITS_BY_AUTH0USERID, {
        variables: { auth0UserId: userDepure },
    })

    console.log(dataSalidas?.findSalidasByAuth0UserId)
    console.log(dataBeneficios?.findBenefitsByAuth0UserId)
    const notify = () => toast.success('Se a eliminado esta salida')

    const [removePersonOnExit] = useMutation(REMOVE_PERSON_ON_EXIT, {
        variables: {
            salida: idSalida,
            auth0UserId: userDepure,
        },
    })
    console.log({ idSalida, userDepure })

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ mb: 2, color: 'white' }}>
                Hola! {user?.name}
            </Typography>
            <Card
                variant="outlined"
                sx={{
                    mb: 4,
                    backgroundImage: 'linear-gradient(to bottom right, #8BC34A, #CDDC39);',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CardContent style={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant="h5" sx={{ mb: 2, color: 'green', margin: 2 }}>
                        Tus Salidas
                    </Typography>
                    <List>
                        <Toaster />

                        {dataSalidas?.findSalidasByAuth0UserId.map((output, index) => (
                            <div key={index}>
                                <ListItem>
                                    <Typography variant="body1" style={{ color: 'white' }}>
                                        {output.name}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="body1">{output.date}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        style={{ color: 'red' }}
                                        onClick={() => {
                                            setIdSalida(output.id)
                                            removePersonOnExit()
                                            refetchSalidas()
                                            notify()
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </ListItem>
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>
            <Card
                variant="outlined"
                sx={{
                    // mb: 4,
                    backgroundImage: 'linear-gradient(to bottom right, #8BC34A, #CDDC39);',
                }}
            >
                <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" sx={{ mb: 2, color: 'green' }}>
                        Beneficios
                    </Typography>
                    <List>
                        {dataBeneficios?.findBenefitByAuth0UserId.map((benefit, index) => (
                            <div key={index}>
                                <ListItem>
                                    <Typography variant="body1" style={{ color: 'white' }}>
                                        {benefit.name}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="body1">{benefit.description}</Typography>
                                </ListItem>
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Box>
    )
}

export default UserProfile
