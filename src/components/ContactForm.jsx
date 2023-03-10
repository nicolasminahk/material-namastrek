import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Select, MenuItem, Button, Box } from '@mui/material'

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
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
                    helperText={errors.telephone && 'Por favor ingrese su n??mero Celular'}
                />
                <TextField
                    label="Direcci??n"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    {...register('address', { required: true })}
                    error={errors.address ? true : false}
                    helperText={errors.address && 'Por favor ingrese su direcci??n'}
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
                    helperText={errors.profession && 'Por favor ingrese su Profesi??n'}
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
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Box>
    )
}

export default ContactForm
