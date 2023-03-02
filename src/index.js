import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import theme from './config/theme.js'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Auth0Provider
                domain="dev-v68nrhhmjwsv23p7.us.auth0.com"
                clientId="9fsPMkB2SKWKHLXntrT1fVHbRXf8l4Pn"
                redirectUri={window.location.origin}
            >
                <App />
            </Auth0Provider>
        </BrowserRouter>
    </ThemeProvider>
)
