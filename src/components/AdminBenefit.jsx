import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material'

const ALL_BENEFICIOS = gql`
    query Beneficios {
        allBeneficios {
            id
            name
            description
            date
        }
    }
`

const ADD_BENEFICIO = gql`
    mutation Mutation($name: String!, $description: String!, $date: String!) {
        addBeneficios(name: $name, description: $description, date: $date) {
            date
            description
            id
            name
        }
    }
`
const DELETE_BENEFICIO = gql`
    mutation Mutation($id: ID!) {
        deleteBeneficios(id: $id) {
            id
        }
    }
`
const AdminBenefit = () => {
    const { loading, error, data, refetch } = useQuery(ALL_BENEFICIOS, { pollInterval: 0 })
    const [deleteBenefit, setDeleteBenefit] = useState('')
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        date: new Date().toLocaleDateString(),
    })

    const [createBeneficio] = useMutation(ADD_BENEFICIO, {
        variables: {
            name: formState.name,
            description: formState.description,
            date: new Date().toLocaleDateString(),
        },
    })
    const [deleteBeneficios] = useMutation(DELETE_BENEFICIO, {
        variables: {
            id: deleteBenefit,
        },
    })

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

    const handleSubmit = (e) => {
        e.preventDefault()
        createBeneficio()
        refetch()
        setFormState({
            name: '',
            description: '',
            date: '',
        })
    }
    const handleDelete = (id) => {
        setDeleteBenefit(id)
        deleteBeneficios()
        refetch()
    }

    if (loading) return <Typography>Loading</Typography>
    if (error) return <Typography>{error}</Typography>

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">Beneficios</Typography>
            <List>
                {data?.allBeneficios.map((beneficio) => {
                    return (
                        <Box key={beneficio.id} paddingBottom={1} paddingTop={1}>
                            <List>
                                <ListItem>
                                    <Typography variant="h6" style={{ color: 'green' }}>
                                        {beneficio.name}
                                    </Typography>
                                    <Button onClick={() => handleDelete(beneficio.id)} style={{ color: 'red' }}>
                                        Eliminar
                                    </Button>
                                </ListItem>
                            </List>
                        </Box>
                    )
                })}
            </List>
            <div style={{ marginTop: 20 }}>
                <Typography variant="h6">Nuevo Beneficio</Typography>
                <TextField
                    value={formState.name}
                    onChange={handleNameChange}
                    label="Nombre"
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    value={formState.description}
                    onChange={handleDescriptionChange}
                    label="Descripción"
                    variant="outlined"
                    margin="dense"
                    multiline
                    rows={4}
                />
                <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: 10 }}>
                    Subir
                </Button>
            </div>
        </div>
    )
}

export default AdminBenefit
