import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const BenefitsList = ({ benefits }) => {
    return (
        <div>
            <Typography>Tus Beneficios</Typography>
            {benefits?.map((benefit, index) => (
                <Card
                    key={index}
                    sx={{
                        maxWidth: 345,
                        margin: '0 auto',
                        marginTop: 4,
                    }}
                >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                            {benefit.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                            {benefit.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default BenefitsList
