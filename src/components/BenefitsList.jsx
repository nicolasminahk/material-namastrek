import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_BENEFICIOS = gql`
    query Beneficios {
        allBeneficios {
            id
            name
            description
            date
        }
    }
`

const BenefitsList = ({ benefits }) => {
    const { loading, error, data, refetch } = useQuery(ALL_BENEFICIOS, { pollInterval: 500 })
    return (
        <div>
            <Typography>Tus Beneficios</Typography>
            {data?.allBeneficos?.map((benefit, index) => (
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
                            {benefit.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                            {benefit.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                            {benefit.date}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default BenefitsList
