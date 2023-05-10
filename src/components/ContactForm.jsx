import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Select, MenuItem, Button, Box } from '@mui/material'
import { gql, useMutation } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const ADD_DATA_TO_USER = gql`
    mutation AddDataToUser($data: DataInput!, $auth0UserId: String!) {
        addDataToUser(data: $data, auth0UserId: $auth0UserId) {
            username
            data {
                adress
                alergiaAlimentos
                alergiaMedicamentos
                id
                name
                obraSocial
                phone
                profession
                tipoDeSangre
                email
                auth0UserId
            }
        }
    }
`
function extractNumbers(inputString) {
    return inputString?.replace(/\D/g, '')
}

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const { user, isAuthenticated, error: errorAuth0, isLoading: loadingAuth0 } = useAuth0()
    const [data, setData] = useState('')
    const userDepure = extractNumbers(user?.sub)
    console.log(userDepure)
    const navigate = useNavigate()

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

    const onSubmit = (data) => {
        console.log(data)
        setData(data)
    }

    const [addDataToUser] = useMutation(ADD_DATA_TO_USER, {
        variables: {
            auth0UserId: userDepure,
            data: {
                name: data.name,
                adress: data.address,
                phone: data.telephone,
                profession: data.profession,
                obraSocial: data.socialSecurity,
                alergiaMedicamentos: data.drugAllergy,
                alergiaAlimentos: data.foodAllergy,
                tipoSangre: data.bloodType,
                email: user.email,
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
                    maxWidth: '600px',
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Nombre Completo"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        {...register('name', { required: true })}
                        error={errors.name ? true : false}
                        helperText={errors.name && 'Por favor ingrese su nombre'}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        {...register('email', { required: true })}
                        error={errors.email ? true : false}
                        helperText={errors.email && 'Por favor ingrese un Email Valido'}
                    />
                    <TextField
                        label="Celular"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        {...register('telephone', { required: true })}
                        error={errors.telephone ? true : false}
                        helperText={errors.telephone && 'Por favor ingrese su número Celular'}
                    />
                    <TextField
                        label="Dirección"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        {...register('address', { required: true })}
                        error={errors.address ? true : false}
                        helperText={errors.address && 'Por favor ingrese su dirección'}
                    />
                    <TextField
                        label="Alergia a Medicamentos"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        {...register('drugAllergy')}
                    />
                    <TextField
                        label="Alergia a comidas"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        {...register('foodAllergy')}
                    />
                    <TextField
                        label="Profesion"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        {...register('profession', { required: true })}
                        error={errors.profession ? true : false}
                        helperText={errors.profession && 'Por favor ingrese su Profesión'}
                    />
                    <TextField
                        label="Obra Social"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        {...register('socialSecurity', { required: true })}
                        error={errors.socialSecurity ? true : false}
                        helperText={errors.socialSecurity && 'Por favor ingrese el nombre de su Obra Social'}
                    />
                    <Select
                        label="Tipo de Sangre"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        {...register('bloodType', { required: true })}
                        error={errors.bloodType ? true : false}
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
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => {
                            addDataToUser()
                            navigate('/')
                        }}
                    >
                        Guardar
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default ContactForm
