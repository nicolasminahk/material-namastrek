import React from 'react'
import { Box, Typography, Button, Modal } from '@mui/material'
import { styled } from '@mui/material/styles'
import Navbar from '../components/navbar/Navbar'
import UserProfile from '../components/UserProfile'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import { useNavigate } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'

const UserProfileContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',

    alignItems: 'center',
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(4),
    backgroundImage: 'linear-gradient(to bottom right, #8BC34A, #CDDC39)',
    animation: 'fadeIn 1s ease-in-out',
    animationFillMode: 'forwards',
}))

const FIND_DATA_BY_AUTH0_USERID = gql`
    query FindDataByAuth0UserId($auth0UserId: String!) {
        findDataByAuth0UserId(auth0UserId: $auth0UserId) {
            email
            data {
                adress
            }
        }
    }
`

function extractNumbers(inputString) {
    return inputString?.replace(/\D/g, '')
}

const Profile = () => {
    const navigate = useNavigate()
    const { user, isAuthenticated, error: errorAuth0, isLoading: loadingAuth0 } = useAuth0()
    const userDepure = extractNumbers(user?.sub)
    const { loading, error, data } = useQuery(FIND_DATA_BY_AUTH0_USERID, {
        variables: {
            auth0UserId: userDepure,
        },
    })

    console.log(data)
    return (
        <>
            <Navbar />
            <UserProfileContainer>
                {
                    //Si !user.data mostrar formulario, de lo contrario no mostrarlo
                }
                <>
                    <Typography>Para poder realizar Actividades debe llenar el siguiente formulario:</Typography>
                    <Button onClick={() => navigate('/form')}>Formulario</Button>
                </>
                <UserProfile />
            </UserProfileContainer>
            <Footer />
        </>
    )
}

export default Profile

//Botón de cancelar una actividad
