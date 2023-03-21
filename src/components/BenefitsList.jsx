import React from 'react'
import { Card, CardActionArea, CardContent, Typography, Button } from '@mui/material'

const BenefitsList = ({ benefits }) => {
    return (
        <Card
            key={benefits.id}
            sx={{
                margin: '0 auto',
                width: '100%',
                marginTop: 4,
                backgroundColor: '#90E825',
                alignItems: 'center',
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
            <CardActionArea>
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        mt: 2,
                        // alignSelf: 'flex-start',
                        '@media (max-width:600px)': { alignSelf: 'center', mt: 4 },
                    }}
                >
                    Adquirir Ahora
                </Button>
            </CardActionArea>
        </Card>
    )
}

export default BenefitsList
