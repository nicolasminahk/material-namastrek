import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
// import { gql, useQuery, useMutation } from '@apollo/client'

// const CREATE_USER = gql`
//     mutation Mutation($createUserId: ID!, $email: String!) {
//         createUser(id: $createUserId, email: $email) {
//             id
//             email
//         }
//     }
// `
//PARA EXTRAER LAS LETRAS Y DEJAR LAS LETRAS PARA UTILIZAR COMO ID
function extractNumbers(inputString) {
    return inputString.replace(/\D/g, '')
}
export const LoginButton = () => {
    const { loginWithRedirect, user, isAuthenticated } = useAuth0()
    console.log(isAuthenticated)
    if (isAuthenticated) {
        console.log(user)
    }
    // const [createUser] = useMutation(CREATE_USER, {
    //     variables: {
    //         id: extractNumbers(user.sub)
    //     },
    // })
    return <Button onClick={() => loginWithRedirect()}>Login</Button>
}
