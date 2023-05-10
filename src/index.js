import React, { useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import theme from './config/theme.js'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const httpLink = createHttpLink({
    // uri: 'http://localhost:4000',
    uri: process.env.REACT_APP_URL,
})

const authLink = setContext((_, { headers }) => {
    const token = cookies.get('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
})
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

// const redirectUri = isMobile ? 'http://192.168.100.5:3000' : window.location.origin
const redirectUri = window.location.origin
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Auth0Provider
                    domain={process.env.REACT_APP_DOMAIN}
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    redirectUri={redirectUri}
                >
                    <App />
                </Auth0Provider>
            </BrowserRouter>
        </ApolloProvider>
    </ThemeProvider>
)
