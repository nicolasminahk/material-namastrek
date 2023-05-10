import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import { gql, useMutation } from '@apollo/client'
import { useEffect } from 'react'

const CREATE_USER = gql`
    mutation Mutation($createUserId: ID!, $email: String!) {
        createUser(id: $createUserId, email: $email) {
            id
            email
        }
    }
`

function extractNumbers(inputString) {
    return inputString.replace(/\D/g, '')
}

export const LoginButton = () => {
    const { loginWithRedirect, user, isAuthenticated } = useAuth0()
    const [userId, setUserID] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (isAuthenticated) {
            const userIdDepure = extractNumbers(user.sub)
            setUserID(userIdDepure)
            setEmail(user.email)
            console.log(userId)
        }
    }, [user])

    const [createUser] = useMutation(CREATE_USER, {
        variables: {
            id: userId,
            email: email,
        },
    })

    const handleCreate = () => {
        createUser()
    }
    return (
        <Button
            onClick={() => {
                loginWithRedirect().then(() => {
                    handleCreate()
                })
            }}
        >
            Login
        </Button>
    )
}
