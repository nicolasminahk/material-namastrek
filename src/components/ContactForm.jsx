import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Select, MenuItem, Button, Box } from '@mui/material'
import { gql, useMutation } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const ADD_DATA_TO_USER = gql`
    mutation addDataToUser($data: DataInput!, $auth0UserId: String!) {
        addDataToUser(data: $data, auth0UserId: $auth0UserId) {
            adress
            alergiaAlimentos
            alergiaMedicamentos
            name
            obraSocial
            phone
            profession
            tipoSangre
            email
            fechaDeNacimiento
            dni
            auth0UserId
        }
    }
`
function extractNumbers(inputString) {
    return inputString?.replace(/\D/g, '')
}

const ContactForm = () => {
    const { user, isAuthenticated, error: errorAuth0, isLoading: loadingAuth0 } = useAuth0()
    const userDepure = extractNumbers(user?.sub)
    console.log(userDepure)
    const navigate = useNavigate()

    const [formState, setFormState] = useState({
        name: '',
        adress: '',
        phone: '',
        profession: '',
        obraSocial: '',
        alergiaMedicamentos: '',
        alergiaAlimentos: '',
        tipoSangre: '',
        email: '',
        fechaDeNacimiento: '',
        dni: '',
        auth0UserId: userDepure,
    })
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    console.log('se abrio el form')

    console.log('FORM', formState)

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log('ENTRE')
        addDataToUser().then(() => {
            setFormState({
                name: '',
                adress: '',
                phone: '',
                profession: '',
                obraSocial: '',
                alergiaMedicamentos: '',
                alergiaAlimentos: '',
                tipoSangre: '',
                email: '',
                fechaDeNacimiento: '',
                dni: '',
                auth0UserId: userDepure,
            })
            navigate('/')
        })
    }
    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const [addDataToUser] = useMutation(ADD_DATA_TO_USER, {
        variables: {
            auth0UserId: userDepure,
            data: {
                name: formState.name,
                adress: formState.adress,
                phone: formState.phone,
                profession: formState.profession,
                obraSocial: formState.obraSocial,
                alergiaMedicamentos: formState.alergiaMedicamentos,
                alergiaAlimentos: formState.alergiaAlimentos,
                tipoSangre: formState.tipoSangre,
                fechaDeNacimiento: formState.fechaDeNacimiento,
                dni: formState.dni,
                email: user?.email,
                auth0UserId: userDepure,
            },
        },
    })

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: 'linear-gradient(to bottom right, #8BC34A, #CDDC39)',
                mt: 4,
                mx: 3,
                '@media (min-width: 600px)': {
                    mx: 'auto',
                },
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    width: '100%',
                    maxWidth: '500px',
                    bgcolor: '#FFFFFF',
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                    borderRadius: '10px',
                    padding: '30px',
                    mb: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 4,
                    mx: 3,
                    '@media (min-width: 600px)': {
                        mx: 'auto',
                    },
                }}
            >
                <form onSubmit={handleFormSubmit}>
                    <TextField
                        label="Nombre Completo"
                        variant="outlined"
                        name="name"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formState.name}
                        onChange={(e) => handleChange(e)}
                        // InputProps={{ name: 'name', ...register('name', { required: true }) }}
                        // {...register('name', { required: true })}
                        // error={errors.name ? true : false}
                        // helperText={errors.name && 'Por favor ingrese su nombre'}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formState.email}
                        onChange={(e) => handleChange(e)}
                        // {...register('email', { required: true })}
                        // error={errors.email ? true : false}
                        // helperText={errors.email && 'Por favor ingrese un Email Valido'}
                    />
                    <TextField
                        label="Celular"
                        variant="outlined"
                        name="phone"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formState.phone}
                        onChange={(e) => handleChange(e)}
                        // {...register('telephone', { required: true })}
                        // error={errors.telephone ? true : false}
                        // helperText={errors.telephone && 'Por favor ingrese su número Celular'}
                    />
                    <TextField
                        label="Dirección"
                        variant="outlined"
                        name="adress"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={(e) => handleChange(e)}
                        // {...register('address', { required: true })}
                        value={formState.adress}
                        // error={errors.address ? true : false}
                        // helperText={errors.address && 'Por favor ingrese su dirección'}
                    />
                    <TextField
                        label="Alergia a Medicamentos"
                        variant="outlined"
                        name="alergiaMedicamentos"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={(e) => handleChange(e)}
                        // {...register('drugAllergy')}
                        value={formState.alergiaMedicamentos}
                    />
                    <TextField
                        label="Alergia a comidas"
                        variant="outlined"
                        name="alergiaAlimentos"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={(e) => handleChange(e)}
                        // {...register('foodAllergy')}
                        value={formState.alergiaAlimentos}
                    />
                    <TextField
                        label="Profesion"
                        variant="outlined"
                        name="profession"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={(e) => handleChange(e)}
                        // {...register('profession', { required: true })}
                        value={formState.profession}
                        // error={errors.profession ? true : false}
                        // helperText={errors.profession && 'Por favor ingrese su Profesión'}
                    />
                    <TextField
                        label="Obra Social"
                        variant="outlined"
                        fullWidth
                        name="obraSocial"
                        sx={{ mb: 2 }}
                        onChange={(e) => handleChange(e)}
                        // {...register('socialSecurity', { required: true })}
                        value={formState.obraSocial}
                        // error={errors.socialSecurity ? true : false}
                        // helperText={errors.socialSecurity && 'Por favor ingrese el nombre de su Obra Social'}
                    />
                    <TextField
                        label="Fecha de Nacimiento"
                        variant="outlined"
                        fullWidth
                        name="fechaDeNacimiento"
                        sx={{ mb: 2 }}
                        onChange={(e) => handleChange(e)}
                        value={formState.fechaDeNacimiento}
                    />
                    <TextField
                        label="DNI"
                        variant="outlined"
                        fullWidth
                        name="dni"
                        sx={{ mb: 2 }}
                        onChange={(e) => handleChange(e)}
                        value={formState.dni}
                    />
                    <Select
                        label="Tipo de Sangre"
                        variant="outlined"
                        fullWidth
                        name="tipoSangre"
                        sx={{ mb: 2 }}
                        // {...register('bloodType', { required: true })}
                        value={formState.tipoSangre}
                        onChange={(e) => handleChange(e)}
                        // error={errors.bloodType ? true : false}
                        displayEmpty
                    >
                        <MenuItem value="">
                            <em>Select</em>
                        </MenuItem>
                        {bloodTypes.map((bloodType) => (
                            <MenuItem key={bloodType} value={bloodType}>
                                {bloodType}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button variant="contained" color="primary" type="submit">
                        Guardar
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default ContactForm
