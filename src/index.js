import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import router from './App'
import theme from './config/theme.js'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter, RouterProvider } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>
)

// <ThemeProvider theme={theme}>
// <RouterProvider router={router} />
// </ThemeProvider>
