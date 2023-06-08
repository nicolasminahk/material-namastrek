import React, { useState } from 'react'
import { Card, CardActionArea, CardContent, Typography, Button } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { gql, useMutation, useQuery } from '@apollo/client'
import toast, { Toaster } from 'react-hot-toast'

const ADD_PERSON_BENEFIT = gql`
    mutation Mutation($benefit: String!, $auth0UserId: String!) {
        addPersonBenefit(benefit: $benefit, auth0UserId: $auth0UserId) {
            name
        }
    }
`

const FIND_BENEFIT_BY_AUTH0 = gql`
    query FindBenefitByAuth0UserId($auth0UserId: String!) {
        findBenefitByAuth0UserId(auth0UserId: $auth0UserId) {
            name
            id
        }
    }
`
const FIND_EXIT_BY_AUTH0 = gql`
    query FindSalidasByAuth0UserId($auth0UserId: String!) {
        findSalidasByAuth0UserId(auth0UserId: $auth0UserId) {
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

    const {
        loading: loadingBenefit,
        error: errorBenefit,
        data: dataBenefit,
    } = useQuery(FIND_BENEFIT_BY_AUTH0, {
        variables: {
            auth0UserId: userDepure,
        },
    })
    const {
        loading: loadingExit,
        error: errorExit,
        data: dataExit,
    } = useQuery(FIND_EXIT_BY_AUTH0, {
        variables: {
            auth0UserId: userDepure,
        },
    })
    const [addPersonBenefit] = useMutation(ADD_PERSON_BENEFIT, {
        variables: {
            benefit: benefit,
            auth0UserId: userDepure,
        },
    })
    const handleBenefits = () => {
        const benefitId = benefit
        const exit = dataExit?.findSalidasByAuth0UserId
        if (!(exit.length >= 3)) {
            notifyError('Debes tener tres salidas minimamente ')
        } else {
            const benefitExist = dataBenefit?.findBenefitByAuth0UserId || []
            if (benefitExist.some((benefit) => benefit.id === benefitId)) {
                notify('Ya tienes este Beneficio')
            } else {
                addPersonBenefit()
                notify('Se agregó a tus Beneficios')
            }
        }
    }

    const notify = (message) => toast.success(message)
    const notifyError = (message) => toast.error(message)
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
                <Toaster />
                {user && (
                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                            mt: 2,
                            '@media (max-width:600px)': { alignSelf: 'center', mt: 4 },
                        }}
                        onClick={() => {
                            setBenefit(benefits.id)
                            handleBenefits()
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
