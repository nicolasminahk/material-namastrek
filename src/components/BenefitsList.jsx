import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const BenefitsList = ({ benefits }) => {
    console.log(benefits)
    return (
        <Card
            key={benefits.id}
            sx={{
                margin: '0 auto',
                width: '100%',
                marginTop: 4,
                backgroundColor: '#90E825',
            }}
        >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    {benefits.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {benefits.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {benefits.date}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BenefitsList
