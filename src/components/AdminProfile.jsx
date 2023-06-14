import React, { useState } from 'react'
import { Typography, TextField, Button, Box } from '@material-ui/core'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Divider, List, ListItem } from '@mui/material'

const ALL_TIPS = gql`
    query Tips {
        allTips {
            id
            name
            description
        }
    }
`
const ADD_TIP = gql`
    mutation Mutation($name: String!, $description: String!) {
        addTips(name: $name, description: $description) {
            description
            id
            name
        }
    }
`

const DELETE_TIP = gql`
    mutation Mutation($id: String!) {
        deleteTips(id: $id) {
            id
        }
    }
`

const AdminProfile = () => {
    const { loading, error, data, refetch } = useQuery(ALL_TIPS, { pollInterval: 0 })
    const [deleteTip, setDeleteTips] = useState('')
    const [formState, setFormState] = useState({
        name: '',
        description: '',
    })

    const [createTip] = useMutation(ADD_TIP, {
        variables: {
            name: formState.name,
            description: formState.description,
        },
    })

    const [deleteTips] = useMutation(DELETE_TIP, {
        variables: {
            id: deleteTip,
        },
    })

    const handleDelete = (id) => {
        setDeleteTips(id)
        deleteTips()
        refetch()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createTip()
        refetch()
        setFormState({
            name: '',
            description: '',
        })
    }

    if (loading) return <Typography>Loading</Typography>
    if (error) return <Typography>{error.message}</Typography>

    return (
        <>
            <Divider />
            {data.allTips.map((tip) => {
                return (
                    <Box key={tip.id} paddingBottom={1} paddingTop={1}>
                        <List>
                            <ListItem>
                                <Typography variant="h6" style={{ color: 'green' }}>
                                    {tip.name}
                                </Typography>
                                <Button onClick={() => handleDelete(tip.id)} style={{ color: 'red' }}>
                                    Eliminar
                                </Button>
                            </ListItem>
                        </List>
                    </Box>
                )
            })}
            <Box justifyContent="center" alignItems="center" flexDirection="column" margin={2}>
                <Typography variant="h5">Nuevo Tip</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        label="Nombre"
                        margin="normal"
                        fullWidth
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        label="Descripción"
                        margin="normal"
                        fullWidth
                        value={formState.description}
                        onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Subir
                    </Button>
                </form>
                <Divider sx={{ padding: 2 }} />
            </Box>
        </>
    )
}

export default AdminProfile
