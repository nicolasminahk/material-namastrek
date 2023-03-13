import React, { useState } from 'react'
import { TextField, Button, Typography, Grid, Box, Divider, ListItem, List } from '@mui/material'
import { gql, useQuery, useMutation } from '@apollo/client'
import DatePicker from 'react-datepicker'

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

const ADD_SALIDA = gql`
    mutation Mutation($name: String!, $description: String!, $date: String!, $price: String!, $duration: String!) {
        addSalidas(name: $name, description: $description, date: $date, price: $price, duration: $duration) {
            date
            description
            duration
            id
            image
            name
            price
        }
    }
`
const DELETE_SALIDAS = gql`
    mutation Mutation($name: String!) {
        deleteSalidas(name: $name) {
            name
        }
    }
`

const AdminExit = () => {
    const { loading, error, data, refetch } = useQuery(ALL_SALIDAS)
    const [deleteSalida, setDeleteSalida] = useState('')

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        date: '',
        duration: '',
        image: '',
        price: '',
    })

    const [createSalida] = useMutation(ADD_SALIDA, {
        variables: {
            name: formState.name,
            description: formState.description,
            date: formState.date,
            duration: formState.duration,
            image: formState.image,
            price: formState.price,
        },
        refetchQueries: [{ query: ALL_SALIDAS }],
    })

    const [deleteSalidas] = useMutation(DELETE_SALIDAS, {
        variables: {
            name: deleteSalida,
        },
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        createSalida()
        setFormState({
            name: '',
            description: '',
            date: '',
            duration: '',
            image: '',
            price: '',
        })
    }

    const handleNameChange = (e) => {
        setFormState({
            ...formState,
            name: e.target.value,
        })
    }
    const handleDescriptionChange = (e) => {
        setFormState({
            ...formState,
            description: e.target.value,
        })
    }
    const handleDelete = (name) => {
        setDeleteSalida(name)
        deleteSalidas()
        refetch()
    }

    if (loading) {
        return <p>Loading</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {data?.allSalidas.map((salida) => (
                    <List item xs={12} key={salida.id}>
                        <ListItem sx={{ bgcolor: 'f1f1f1', padding: 1, marginTop: 1, marginBottom: 1 }}>
                            <Typography variant="h6" sx={{ color: 'green' }}>
                                {salida.name}
                            </Typography>
                            <Button onClick={() => handleDelete(salida.name)} style={{ color: 'red' }}>
                                Eliminar
                            </Button>
                        </ListItem>
                    </List>
                ))}
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: 2,
                }}
            >
                <Typography variant="h6">Nueva Salida</Typography>
                <TextField
                    variant="outlined"
                    sx={{ bgcolor: 'f1f1f1', borderRadius: 2, margin: 1 }}
                    label="Nombre"
                    value={formState.name}
                    onChange={handleNameChange}
                />
                <TextField
                    variant="outlined"
                    sx={{ bgcolor: 'f1f1f1', borderRadius: 2, margin: 1 }}
                    label="Descripción"
                    value={formState.description}
                    onChange={handleDescriptionChange}
                />
                <DatePicker />
                <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleFormSubmit}>
                    Subir
                </Button>
            </Box>
        </>
    )
}
export default AdminExit
