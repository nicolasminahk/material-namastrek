import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'

const AdministratorProfile = () => {
    const [outputs, setOutputs] = useState([])
    const [benefits, setBenefits] = useState([])
    const [tips, setTips] = useState([])

    const [newOutput, setNewOutput] = useState('')
    const [newBenefit, setNewBenefit] = useState('')
    const [newTip, setNewTip] = useState('')

    const addOutput = () => {
        setOutputs([...outputs, newOutput])
        setNewOutput('')
    }

    const addBenefit = () => {
        setBenefits([...benefits, newBenefit])
        setNewBenefit('')
    }

    const addTip = () => {
        setTips([...tips, newTip])
        setNewTip('')
    }

    const deleteOutput = (index) => {
        setOutputs(outputs.filter((_, i) => i !== index))
    }

    const deleteBenefit = (index) => {
        setBenefits(benefits.filter((_, i) => i !== index))
    }

    const deleteTip = (index) => {
        setTips(tips.filter((_, i) => i !== index))
    }

    const updateOutput = (index, newValue) => {
        setOutputs(outputs.map((value, i) => (i === index ? newValue : value)))
    }

    const updateBenefit = (index, newValue) => {
        setBenefits(benefits.map((value, i) => (i === index ? newValue : value)))
    }

    const updateTip = (index, newValue) => {
        setTips(tips.map((value, i) => (i === index ? newValue : value)))
    }

    return (
        <div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4">Administrator Profile</Typography>

            <Typography variant="h5">Outputs</Typography>
            <div sx={{ display: 'flex', flexDirection: 'column' }}>
                {outputs.map((output, index) => (
                    <div key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            value={output}
                            onChange={(event) => updateOutput(index, event.target.value)}
                            sx={{ mr: 2 }}
                        />
                        <Button variant="contained" color="error" onClick={() => deleteOutput(index)}>
                            Delete
                        </Button>
                    </div>
                ))}
                <div sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        value={newOutput}
                        onChange={(event) => setNewOutput(event.target.value)}
                        sx={{ mr: 2 }}
                    />
                    <Button variant="contained" color="success" onClick={addOutput}>
                        Add
                    </Button>
                </div>
            </div>

            <div sx={{ display: 'flex', flexDirection: 'column' }}>
                {benefits.map((benefit, index) => (
                    <div key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            value={benefit}
                            onChange={(event) => updateBenefit(index, event.target.value)}
                            sx={{ mr: 2 }}
                        />
                        <Button variant="contained" color="error" onClick={() => deleteBenefit(index)}>
                            Delete
                        </Button>
                    </div>
                ))}
                <div sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        value={newOutput}
                        onChange={(event) => setNewBenefit(event.target.value)}
                        sx={{ mr: 2 }}
                    />
                    <Button variant="contained" color="success" onClick={addBenefit}>
                        Add
                    </Button>
                </div>
            </div>
        </div>
    )
}
{
    /* <Typography variant="h5">Benefits</Typography>
      <div sx={{ display: 'flex', flexDirection: 'column' }}>
        {benefits.map((benefit, index) => (
          <div key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              value={benefit}
              onChange={(event) => updateBenefit(index, event.target.value)}
              sx={{ mr: 2 }}
            />
            <Button variant="contained" color="error" onClick={() => deleteBenefit(index)}>
              Delete
            </> */
}

export default AdministratorProfile
