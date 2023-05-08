import React, { useState } from 'react'
import { TextField, Button, Typography, Grid, Box, Divider, ListItem, List } from '@mui/material'
import { gql, useQuery, useMutation } from '@apollo/client'
import * as FileSaver from 'file-saver'
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility'
const { Buffer } = require('buffer')

const ALL_SALIDAS = gql`
    query AllSalidas {
        allSalidas {
            date
            description
            id
            name
            price
            users
        }
    }
`
const ADD_SALIDAS = gql`
    mutation Mutation(
        $name: String!
        $description: String!
        $date: String!
        $price: String!
        $duration: String!
        $image: String!
    ) {
        addSalidas(
            name: $name
            description: $description
            date: $date
            price: $price
            duration: $duration
            image: $image
        ) {
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
const FIND_USERS_ON_SALIDA = gql`
    query FindUsersOnSalida($salidaId: String!) {
        findUsersOnSalida(salidaId: $salidaId) {
            _id
            name
            adress
            phone
            alergiaAlimentos
            alergiaMedicamentos
            obraSocial
            profession
            tipoSangre
        }
    }
`
// function downloadUserData(users) {
//     const data = users?.map((user) => {
//         const userData = user?.data[0]
//         return {
//             name: userData.name,
//             address: userData.address,
//             phone: userData.phone,
//             profession: userData.profession,
//             obraSocial: userData.obraSocial,
//             alergiaMedicamentos: userData.alergiaMedicamentos,
//             alergiaAlimentos: userData.alergiaAlimentos,
//             tipoSangre: userData.tipoSangre,
//         }
//     })

//     const blob = new Blob([JSON.stringify(data)], { type: 'text/plain;charset=utf-8' })
//     FileSaver.saveAs(blob, 'user-data.txt')
// }

const AdminExit = () => {
    const [salidaId, setSalidaId] = useState('')
    const [usuariosEnSalida, setUsuariosEnSalida] = useState([])
    const [deleteSalida, setDeleteSalida] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)

    const {
        loading: loadingSalidas,
        error: errorSalidas,
        data: dataSalidas,
        refetch: refetchSalidas,
    } = useQuery(ALL_SALIDAS)
    const {
        loading: loadingUsuarios,
        error: errorUsuarios,
        data: dataUsuarios,
        refetch: refetchUsuarios,
    } = useQuery(FIND_USERS_ON_SALIDA, {
        variables: {
            salidaId: salidaId,
        },
        onCompleted: (data) => {
            if (data && data.findUsersOnSalida && data.findUsersOnSalida.length > 0) {
                setUsuariosEnSalida(data.findUsersOnSalida)
            }
        },
    })

    console.log(usuariosEnSalida)
    console.log('DATA 1', dataUsuarios?.findUsersOnSalida)

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        date: '',
        duration: '',
        image: '',
        price: '',
        id: '',
    })
    console.log(formState)

    const [createSalida] = useMutation(ADD_SALIDAS, {
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
        refetchSalidas()
    }
    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleFileUpload = () => {
        //Aca debo pasarlo a base64
        const reader = new FileReader()
        const file = selectedFile

        reader.onloadend = () => {
            const base64String = reader.result.replace(/^data:image\/\w+;base64,/, '')
            const imageBuffer = Buffer.from(base64String, 'base64')

            // Now you can save the base64String in your database
            console.log(base64String)
            setFormState({
                ...formState,
                image: base64String,
            })
        }

        reader.readAsDataURL(file)
    }

    async function handleDownloadUsers() {
        if (usuariosEnSalida.length > 0) {
            downloadUserData(usuariosEnSalida)
        } else {
            const result = await refetchSalidas()
            if (result && result.findUsersOnSalida && result.findUsersOnSalida.length > 0) {
                setUsuariosEnSalida(result.findUsersOnSalida)
                downloadUserData(result.findUsersOnSalida)
            }
        }
    }

    // function downloadUserData(users) {
    //     const data = users
    //         ?.map((user) => {
    //             const userData = user?.data?.[0]
    //             if (!userData) {
    //                 return null
    //             }

    //             return {
    //                 name: userData.name || '',
    //                 address: userData.address || '',
    //                 phone: userData.phone || '',
    //                 profession: userData.profession || '',
    //                 obraSocial: userData.obraSocial || '',
    //                 alergiaMedicamentos: userData.alergiaMedicamentos || '',
    //                 alergiaAlimentos: userData.alergiaAlimentos || '',
    //                 tipoSangre: userData.tipoSangre || '',
    //             }
    //         })
    //         .filter((userData) => userData !== null)

    //     const blob = new Blob([JSON.stringify(data)], {
    //         type: 'text/plain;charset=utf-8',
    //     })
    //     FileSaver.saveAs(blob, 'user-data.txt')
    // }
    function downloadUserData(user) {
        if (!user) {
            console.log('No data available for user')
            return
        }

        const data = Object.entries(user).reduce((acc, [key, value]) => {
            const dataValue = value || ''
            return { ...acc, [key]: dataValue }
        }, {})

        const blob = new Blob([JSON.stringify(data)], {
            type: 'text/plain;charset=utf-8',
        })
        FileSaver.saveAs(blob, 'usuarios-data.txt')
    }

    if (loadingSalidas) {
        return <p>Loading</p>
    }

    if (errorSalidas) {
        return <p>{errorSalidas}</p>
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {dataSalidas?.allSalidas.map((salida) => (
                    <List item xs={12} key={salida.id}>
                        <ListItem sx={{ bgcolor: 'f1f1f1', padding: 1, marginTop: 1, marginBottom: 1 }}>
                            <Typography variant="h6" sx={{ color: 'green' }}>
                                {salida.name}
                            </Typography>
                            <Box>
                                <ListItem sx={{ bgcolor: 'f1f1f1', padding: 1, marginTop: 1, marginBottom: 1 }}>
                                    <SettingsAccessibilityIcon style={{ color: 'green' }} />
                                    <Typography variant="h6" sx={{ color: 'green' }}>
                                        {salida.users.length}
                                    </Typography>
                                </ListItem>
                            </Box>

                            <Button onClick={() => handleDelete(salida.id)} style={{ color: 'red' }}>
                                Eliminar
                            </Button>
                            <Button
                                onClick={() => {
                                    setSalidaId(salida.id)
                                    downloadUserData(dataUsuarios?.findUsersOnSalida)
                                    // console.log('data 2', dataUsuarios?.findUsersOnSalida[0])
                                }}
                                // onClick={async () => {
                                //     setSalidaId(salida.id)
                                //     // if (usuariosEnSalida.length > 0) {
                                //     //     downloadUserData(usuariosEnSalida)
                                //     // } else {
                                //     //     const result = await findUsersOnSalida(null, { salidaId: salida.id })
                                //     //     if (result && result.findUsersOnSalida && result.findUsersOnSalida.length > 0) {
                                //     //         setUsuariosEnSalida(result.findUsersOnSalida)
                                //     //         downloadUserData(result.findUsersOnSalida)
                                //     //     }
                                //     // }
                                //     handleDownloadUsers()
                                // }}
                                style={{ color: 'green' }}
                            >
                                Usuarios
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
                    mb: 1,
                    paddingBottom: 10,
                }}
            >
                <Typography variant="h6">Nueva Salida</Typography>
                <TextField
                    variant="outlined"
                    sx={{ bgcolor: 'f1f1f1', borderRadius: 2, margin: 1, paddingBottom: 2 }}
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
                <TextField
                    variant="outlined"
                    sx={{ bgcolor: 'f1f1f1', borderRadius: 2, margin: 1 }}
                    label="Fecha"
                    value={formState.date}
                    onChange={handleDateChange}
                />
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
