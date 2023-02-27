import React from 'react'
import { Typography, Link } from '@mui/material'

function Footer() {
    return (
        <footer
            sx={{
                display: 'flex',
                width: '100%',
                height: 'auto',
                backgroundColor: 'secondary.main',
                padding: '1rem 0',
                position: 'absolute',
                bottom: 0,
                flexDirection: 'colum',
            }}
        >
            <Typography variant="h6" align="center" gutterBottom>
                Namastrek
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Copyright &copy; {new Date().getFullYear()}
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Realizado por <Link href="https://example.com/">Nicolas Minahk</Link>
            </Typography>
        </footer>
    )
}

export default Footer

// style={{
//     flexDirection: 'row-reverse',
//     paddingTop: '200px',
//     marginTop: 1,
//     padding: '1em 0',
//     position: 'absolute',
//     bottom: 0,
//     width: '100% ',
// }}
