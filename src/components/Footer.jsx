import React from 'react'
import { Typography, Link } from '@mui/material'

function Footer() {
    return (
        <footer
            sx={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'secondary.main',
                paddingTop: '1rem',
                paddingBottom: '1rem',
            }}
        >
            <Typography variant="h6" align="center" gutterBottom>
                My Footer
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Copyright &copy; {new Date().getFullYear()}
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Made with ❤️ by <Link href="https://example.com/">Your Name</Link>
            </Typography>
        </footer>
    )
}

export default Footer
