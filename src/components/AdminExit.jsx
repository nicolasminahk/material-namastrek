import React, { useState } from 'react'
import {
    TextField,
    Button,
    Typography,
    Grid,
    Box,
    Divider,
    ListItem,
    List,
    Card,
    Drawer,
    ListItemText,
    IconButton,
} from '@mui/material'
import { gql, useQuery, useMutation } from '@apollo/client'
import CheckIcon from '@mui/icons-material/Check'
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload'
import CancelIcon from '@mui/icons-material/Cancel'
import toast, { Toaster } from 'react-hot-toast'

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
            linkImage
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
        $linkImage: String!
    ) {
        addSalidas(
            name: $name
            description: $description
            date: $date
            price: $price
            duration: $duration
            image: $image
            linkImage: $linkImage
        ) {
            date
            description
            duration
            id
            image
            name
            price
            linkImage
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
            name
            auth0UserId
        }
    }
`
const FIND_USER_ON_EXCEL = gql`
    mutation Mutation($salidaId: String!) {
        findUsersOnSalidaInExcel(salidaId: $salidaId) {
            buffer
            filename
            mimetype
        }
    }
`

const CONFIRM_USER = gql`
    mutation ConfirmUsers($salidaId: String!, $auth0UserId: String!) {
        confirmUsers(salidaId: $salidaId, auth0UserId: $auth0UserId) {
            name
        }
    }
`

const AdminExit = () => {
    const [salidaId, setSalidaId] = useState('')
    const [openBox, setOpenBox] = useState(false)
    const [usuariosEnSalida, setUsuariosEnSalida] = useState([])
    const [deleteSalida, setDeleteSalida] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [confirmedUsers, setConfirmedUsers] = useState([])
    const [userAuth0, setUserAuth0] = useState(null)
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
                setUsuariosEnSalida(data?.findUsersOnSalida)
            }
        },
    })

    const [confirmUser] = useMutation(CONFIRM_USER, {
        variables: {
            salidaId: salidaId,
            auth0UserId: userAuth0,
        },
    })

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    const confirmedUser = (userAuth0) => {
        console.log('Confirmed', 'auth:', userAuth0, 'id salida:', salidaId)
        confirmUser()
        notify('Se confirmó el usuario')
    }

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        date: '',
        duration: '',
        image: '',
        price: '',
        linkImage: '',
        id: '',
    })

    const [createSalida] = useMutation(ADD_SALIDAS, {
        variables: {
            name: formState.name,
            description: formState.description,
            date: formState.date,
            duration: formState.duration,
            image: formState.image,
            price: formState.price,
            linkImage: formState.linkImage,
            id: formState.id,
        },
        refetchQueries: [{ query: ALL_SALIDAS }],
    })

    const [deleteSalidas] = useMutation(DELETE_SALIDAS, {
        variables: {
            id: deleteSalida,
        },
        refetchSalidas,
    })
    const [findUsersOnSalidaInExcel] = useMutation(FIND_USER_ON_EXCEL, {
        variables: {
            salidaId: salidaId,
        },
    })
    const notify = (message) => toast.success(message)
    const handleFormSubmit = (e) => {
        e.preventDefault()
        createSalida()
        setFormState({
            name: '',
            description: '',
            date: '',
            duration: '',
            image: '',
            linkImage: '',
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
    const handleLinkImageChange = (e) => {
        setFormState({
            ...formState,
            linkImage: e.target.value,
        })
    }
    const handleDelete = (id) => {
        setDeleteSalida(id)
        deleteSalidas()
        refetchSalidas()
        notify('Se eliminó la salida')
    }
    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleFileUpload = () => {
        const reader = new FileReader()
        const file = selectedFile

        reader.onloadend = () => {
            const base64String = reader.result.replace(/^data:image\/\w+;base64,/, '')
            const imageBuffer = Buffer.from(base64String, 'base64')

            setFormState({
                ...formState,
                image: base64String,
            })
        }

        reader.readAsDataURL(file)
    }

    if (loadingSalidas) {
        return <p>Loading</p>
    }

    if (errorSalidas) {
        return <p>{errorSalidas}</p>
    }

    const handleExcelButtonClick = async () => {
        try {
            const { data } = await findUsersOnSalidaInExcel({
                variables: {
                    salidaId: salidaId,
                },
            })

            if (!data || !data.findUsersOnSalidaInExcel || !data.findUsersOnSalidaInExcel.buffer) {
                console.log('No file found or file is empty')
                return
            }

            const fileData = data.findUsersOnSalidaInExcel.buffer
            const filename = data.findUsersOnSalidaInExcel.filename
            const mimetype = data.findUsersOnSalidaInExcel.mimetype

            const byteCharacters = atob(fileData)
            const byteNumbers = new Array(byteCharacters.length)

            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i)
            }

            const byteArray = new Uint8Array(byteNumbers)
            const blob = new Blob([byteArray], { type: mimetype })

            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.target = '_blank'
            link.download = filename
            link.click()
        } catch (error) {
            console.log(error)
        }
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
                                <ListItem
                                    sx={{ bgcolor: 'f1f1f1', padding: 1, marginTop: 1, marginBottom: 1 }}
                                ></ListItem>
                            </Box>

                            <Button onClick={() => handleDelete(salida.id)} style={{ color: 'red', margin: '0 4px' }}>
                                <CancelIcon />
                            </Button>
                            <Button
                                onClick={() => {
                                    setSalidaId(salida.id)
                                    setUsuariosEnSalida(salida.users) // Asignar los usuarios de la salida a usuariosEnSalida
                                    toggleDrawer() // Abrir el Drawer al hacer clic en "Usuarios"
                                }}
                                style={{ color: 'green', margin: '0 4px' }}
                            >
                                Usuarios
                            </Button>
                            <Button
                                onClick={() => {
                                    setSalidaId(salida.id)
                                    handleExcelButtonClick()
                                }}
                            >
                                <SimCardDownloadIcon />
                            </Button>
                        </ListItem>
                        <Divider />
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
                    variant="outlined"
                    sx={{ bgcolor: 'f1f1f1', borderRadius: 2, margin: 1 }}
                    label="Link de Fotos"
                    value={formState.linkImage}
                    onChange={handleLinkImageChange}
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
            <Toaster />

            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        {usuariosEnSalida.map((user) => (
                            <>
                                <ListItem key={user.id}>
                                    <ListItemText primary={user.name} />
                                    <IconButton
                                        onClick={() => {
                                            console.log('user', user.auth0UserId)
                                            setUserAuth0(user.auth0UserId)
                                            confirmedUser(user.auth0UserId)
                                        }}
                                        color={confirmedUsers.includes(user) ? 'primary' : 'default'}
                                    >
                                        <CheckIcon style={{ color: 'green' }} />
                                    </IconButton>
                                </ListItem>
                                <Divider />
                            </>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default AdminExit
