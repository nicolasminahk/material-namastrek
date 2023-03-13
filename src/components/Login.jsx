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

export const LoginButton = () => {
    const { loginWithRedirect, user, isAuthenticated } = useAuth0()
    if (isAuthenticated) {
        console.log(user)
    }
    // const [createSalida] = useMutation(CREATE_USER, {
    //     variables: {
    //         id: user
    //     },
    //     refetchQueries: [{ query: ALL_SALIDAS }],
    // })
    return <Button onClick={() => loginWithRedirect()}>Login</Button>
}
