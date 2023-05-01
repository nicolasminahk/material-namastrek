import React, { useState } from 'react'
import { Card, CardActionArea, CardContent, Typography, Button } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { gql, useMutation } from '@apollo/client'
//ADD PERSON BENEFIT
//Capturar ID del beneficio y ID de usuario

const ADD_PERSON_BENEFIT = gql`
    mutation Mutation($benefit: String!, $auth0UserId: String!) {
        addPersonBenefit(benefit: $benefit, auth0UserId: $auth0UserId) {
            name
        }
    }
`

function extractNumbers(inputString) {
    return inputString?.replace(/\D/g, '')
}

const BenefitsList = ({ benefits }) => {
    const { user, isAuthenticated, error: errorAuth0, isLoading: loadingAuth0 } = useAuth0()
    const [benefit, setBenefit] = useState('')
    const userDepure = extractNumbers(user?.sub)

    const [addPersonBenefit] = useMutation(ADD_PERSON_BENEFIT, {
        variables: {
            benefit: benefit,
            auth0UserId: userDepure,
        },
    })

    console.log({ benefit, userDepure })

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
                {user && (
                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                            mt: 2,
                            // alignSelf: 'flex-start',
                            '@media (max-width:600px)': { alignSelf: 'center', mt: 4 },
                        }}
                        onClick={() => {
                            setBenefit(benefits.id)
                            addPersonBenefit()
                        }}
                    >
                        Adquirir Ahora
                    </Button>
                )}
            </CardActionArea>
        </Card>
    )
}

export default BenefitsList
