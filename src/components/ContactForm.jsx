import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Select, MenuItem, Button } from '@mui/material'

function ContactForm() {
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register('name', { required: true })}
                error={errors.name ? true : false}
                helperText={errors.name && 'Please enter your name'}
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register('email', { required: true })}
                error={errors.email ? true : false}
                helperText={errors.email && 'Please enter a valid email address'}
            />
            <TextField
                label="Telephone"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register('telephone', { required: true })}
                error={errors.telephone ? true : false}
                helperText={errors.telephone && 'Please enter your telephone number'}
            />
            <TextField
                label="Address"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register('address', { required: true })}
                error={errors.address ? true : false}
                helperText={errors.address && 'Please enter your address'}
            />
            <TextField label="Drug Allergy" variant="outlined" fullWidth sx={{ mb: 2 }} {...register('drugAllergy')} />
            <TextField label="Food Allergy" variant="outlined" fullWidth sx={{ mb: 2 }} {...register('foodAllergy')} />
            <TextField
                label="Profession"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register('profession', { required: true })}
                error={errors.profession ? true : false}
                helperText={errors.profession && 'Please enter your profession'}
            />
            <TextField
                label="Social Security"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register('socialSecurity', { required: true })}
                error={errors.socialSecurity ? true : false}
                helperText={errors.socialSecurity && 'Please enter your social security number'}
            />
            <Select
                label="Blood Type"
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
    )
}

export default ContactForm
