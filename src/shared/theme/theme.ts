import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#399BFC',
            contrastText: 'rgba(255,255,255,0.87)',
        },
        secondary: {
            main: '#989898',
        },
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '14px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiAppBar: {
            defaultProps: {
                color: 'transparent',
            },
        },
    },
});
