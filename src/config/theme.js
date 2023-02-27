import { createTheme } from '@mui/material'

const palette = {
    primary: {
        main: '#00B4D8',
    },
    secondary: {
        main: '#0077B6',
    },
    text: {
        primary: '#1A202C',
    },
    background: {
        default: '#F0F4F8',
        paper: 'white',
    },
}

const theme = createTheme({
    palette,
    overrides: {
        MuiButton: {
            root: {
                borderRadius: '4px',
                textTransform: 'none',
            },
            containedPrimary: {
                backgroundColor: palette.primary.main,
                color: 'white',
                '&:hover': {
                    backgroundColor: palette.secondary.main,
                },
            },
        },
        MuiPaper: {
            root: {
                backgroundColor: palette.background.paper,
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                padding: '24px',
            },
        },
    },
})

export default theme
