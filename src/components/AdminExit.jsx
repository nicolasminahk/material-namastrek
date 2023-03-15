import React, { useState } from 'react'
import { TextField, Button, Typography, Grid, Box, Divider, ListItem, List } from '@mui/material'
import { gql, useQuery, useMutation } from '@apollo/client'
import DatePicker from 'react-datepicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateField } from '@mui/x-date-pickers/DateField'

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
    mutation Mutation($id: ID!) {
        deleteSalidas(id: $id) {
            id
        }
    }
`

const AdminExit = () => {
    const { loading, error, data, refetch } = useQuery(ALL_SALIDAS)
    const [deleteSalida, setDeleteSalida] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    console.log(deleteSalida)
    console.log(data?.allSalidas)

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        date: '',
        duration: '',
        image: '',
        price: '',
        id: '',
    })

    const [createSalida] = useMutation(ADD_SALIDA, {
        variables: {
            name: formState.name,
            description: formState.description,
            date: formState.date,
            duration: formState.duration,
            image: formState.image,
            price: formState.price,
            id: formState.id,
        },
        refetchQueries: [{ query: ALL_SALIDAS }],
    })

    const [deleteSalidas] = useMutation(DELETE_SALIDAS, {
        variables: {
            id: deleteSalida,
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

    const handleDateChange = (e) => {
        setFormState({
            ...formState,
            date: e.target.value,
        })
    }
    const handleDescriptionChange = (e) => {
        setFormState({
            ...formState,
            description: e.target.value,
        })
    }
    const handlePriceChange = (e) => {
        setFormState({
            ...formState,
            price: e.target.value,
        })
    }
    const handleDurationChange = (e) => {
        setFormState({
            ...formState,
            duration: e.target.value,
        })
    }
    const handleDelete = (id) => {
        setDeleteSalida(id)
        deleteSalidas()
        refetch()
    }
    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleFileUpload = () => {
        // Code to upload the selected file to your server
        console.log(selectedFile)

        //Aca debo pasarlo a base64
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
                            <Button onClick={() => handleDelete(salida.id)} style={{ color: 'red' }}>
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
                <TextField
                    variant="outlined"
                    sx={{ bgcolor: 'f1f1f1', borderRadius: 2, margin: 1 }}
                    label="Precio"
                    value={formState.price}
                    onChange={handlePriceChange}
                />
                <TextField
                    variant="outlined"
                    sx={{ bgcolor: 'f1f1f1', borderRadius: 2, margin: 1 }}
                    label="Duración"
                    value={formState.duration}
                    onChange={handleDurationChange}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateField']} sx={{ paddingBottom: 2 }}>
                        <DateField label="Fecha" value={formState.date} onChange={handleDateChange} />
                    </DemoContainer>
                </LocalizationProvider>
                {/* <DatePicker
                    sx={{
                        margin: '10px',
                        padding: '5px',
                        borderColor: 'gray',
                        borderRadius: '5px',
                        color: 'blue',
                        backgroundColor: '#f0f0f0',
                        fontSize: '18px',
                    }}
                /> */}
                <TextField
                    label="Output Image"
                    type="file"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleFileInputChange}
                    sx={{ mr: 2, paddingBottom: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleFileUpload}>
                    Upload Image
                </Button>
                <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleFormSubmit}>
                    Subir
                </Button>
            </Box>
        </>
    )
}
export default AdminExit
