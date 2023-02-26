import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, TextField, Typography } from '@mui/material'
import { ADD_BENEFIT, DELETE_BENEFIT, UPDATE_BENEFIT } from './graphql/mutations'

const AdministratorProfile = () => {
    const [benefits, setBenefits] = useState([])

    const [newBenefitName, setNewBenefitName] = useState('')
    const [newBenefitDescription, setNewBenefitDescription] = useState('')
    const [newBenefitDate, setNewBenefitDate] = useState('')

    const [addBenefitMutation] = useMutation(ADD_BENEFIT)
    const [deleteBenefitMutation] = useMutation(DELETE_BENEFIT)
    const [updateBenefitMutation] = useMutation(UPDATE_BENEFIT)

    const addBenefit = async () => {
        const { data } = await addBenefitMutation({
            variables: {
                name: newBenefitName,
                description: newBenefitDescription,
                date: newBenefitDate,
            },
        })
        setBenefits([...benefits, data.addBenefits])
        setNewBenefitName('')
        setNewBenefitDescription('')
        setNewBenefitDate('')
    }

    const deleteBenefit = async (id) => {
        await deleteBenefitMutation({
            variables: { id },
        })
        setBenefits(benefits.filter((benefit) => benefit.id !== id))
    }

    const updateBenefit = async (id, name, description, date) => {
        await updateBenefitMutation({
            variables: { id, name, description, date },
        })
        setBenefits(benefits.map((benefit) => (benefit.id === id ? { id, name, description, date } : benefit)))
    }

    return ''
}
// <div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//   <Typography variant="h4">Administrator Profile</Typography>

//   <Typography variant="h5">Benefits</Typography>
//   <div sx={{ display: 'flex', flexDirection: 'column' }}>
//     {benefits.map((benefit) => (
//       <div key={benefit.id} sx={{ display: 'flex', alignItems: 'center' }}>
//         <TextField
//           value={benefit.name}
//           onChange={(event) =>
//             updateBenefit(
//               benefit.id,
//               event.target.value,
//               benefit.description,
//               benefit.date
//             )
//           }
//           sx={{ mr: 2 }}
//         />
//         <TextField
//           value={benefit.description}
//           onChange={(event) =>
//             updateBenefit(
//               benefit.id,
//               benefit.name,
//               event.target.value,
//               benefit.date
//             )
//           }
//           sx={{ mr: 2 }}
//         />
//         <TextField
//           value={benefit.date}
//           onChange={(event) =>
//             updateBenefit(
//               benefit.id,
//               benefit.name,
//               benefit.description,
//               event.target.value
//             )
//           }
//           sx={{ mr: 2 }}
//         />
//         <Button variant="contained" color="error" onClick={() => deleteBenefit(benefit.id)}>
//           Delete
//         </Button>
//       </div>
//     ))}
//     <div sx={{ display: 'flex', alignItems: 'center' }}>
//       <TextField
//         value={newBenefitName}
//         onChange={(event) => setNewBenefitName(event.target.value)}
//         sx={{ mr: 2 }}
//       />
//       <TextField
//         value

//         ></TextField>
