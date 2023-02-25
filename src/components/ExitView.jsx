import React from 'react'
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material'
import { Rating } from '@material-ui/lab'

function ExitView({ name, description, image, price, rating }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                {name}
            </Typography>
            <Card variant="outlined" sx={{ maxWidth: 600 }}>
                <CardMedia component="img" height="400" image={image} alt={name} />
                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Description
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {description}
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Price
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {price}
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Rating
                    </Typography>
                    <Rating value={rating} precision={0.5} readOnly />
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Book Now
                    </Button>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ExitView
