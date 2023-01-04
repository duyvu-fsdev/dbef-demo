import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { grey, lightBlue } from '@mui/material/colors';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeMuiContext = createContext({
    showSidebar: null,
    backgroundColor: '',
    color: '',
    switchMode: () => {},
    switchSidebar: () => {},
});

export const useThemMui = () => useContext(ThemeMuiContext);

function ThemeMuiContextProvider({ children }) {
    const them = useTheme();
    localStorage.getItem('testObject');
    const [mode, setMode] = useState(JSON.parse(localStorage.getItem('mode')) || 'light');
    const [showSidebar, setShow] = useState(false);

    useEffect(() => {
        localStorage.setItem('mode', JSON.stringify(mode));
    }, [mode]);

    const switchMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };
    const switchSidebar = () => {
        setShow(!showSidebar);
    };

    const theme = createTheme({
        breakpoints: {
            values: {
                0: 0,
                240: 240,
                320: 320,
                400: 400,
                480: 480,
                560: 560,
                640: 640,
                720: 720,
                800: 800,
                880: 880,
                960: 960,
                1040: 1040,
                1120: 1120,
                1200: 1200,
                1280: 1280,
                1360: 1360,
                1440: 1440,
                1520: 1520,
                1600: 1600,
                1680: 1680,
                1760: 1760,
                1840: 1840,
                1920: 1920,
            },
        },
        components: {
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        maxWidth: '360px',
                        fontSize: '1.4rem',
                        backgroundColor: '#616161',
                    },
                    arrow: {
                        '::before': {
                            backgroundColor: '#616161',
                        },
                    },
                },
            },
        },
        spacing: 2,
        palette: {
            mode,

            ...(mode === 'light'
                ? {
                      // palette values for light mode
                      primary: {
                          main: '#e0f7fa',
                      },
                      divider: lightBlue[700],
                      background: {
                          default: 'var(--background-color)',
                          paper: 'var(--background-color)',
                      },
                      text: {
                          primary: '#000',
                          secondary: '#9e9e9e',
                      },
                  }
                : {
                      primary: grey,
                      divider: grey[700],
                      background: {
                          default: grey[900],
                          paper: grey[900],
                      },
                      text: {
                          primary: '#fff',
                          secondary: '#9e9e9e',
                      },
                  }),
        },
        typography: {
            htmlFontSize: 16,
            fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
            h1: {
                fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                fontWeight: 300,
                fontSize: '6rem',
                lineHeight: 1.167,
                letterSpacing: '-0.01562em',
            },
            h2: {
                fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                fontWeight: 300,
                fontSize: '3.75rem',
                lineHeight: 1.2,
                letterSpacing: '-0.00833em',
            },
            h3: {
                fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: '3rem',
                lineHeight: 1.167,
                letterSpacing: '0em',
            },
            h4: {
                fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: '2.125rem',
                lineHeight: 1.235,
                letterSpacing: '0.00735em',
            },
            h5: {
                fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: '1.5rem',
                lineHeight: 1.334,
                letterSpacing: '0em',
            },
            h6: {
                fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                fontWeight: 500,
                fontSize: '1.25rem',
                lineHeight: 1.6,
                letterSpacing: '0.0075em',
            },
            subtitle1: {
                fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: 1.75,
                letterSpacing: '0.00938em',
            },
            subtitle2: {
                fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                fontWeight: 500,
                fontSize: '0.875rem',
                lineHeight: 1.57,
                letterSpacing: '0.00714em',
            },
            body1: {
                fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: '1.5rem',
                lineHeight: 1.5,
                letterSpacing: '0.00938em',
            },
            button: {
                fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                fontWeight: 500,
                fontSize: '1.3rem',
                lineHeight: 1.75,
                letterSpacing: '0.02857em',
                textTransform: 'uppercase',
            },
            caption: {
                fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: '0.75rem',
                lineHeight: 1.66,
                letterSpacing: '0.03333em',
            },
            overline: {
                fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: '0.75rem',
                lineHeight: 2.66,
                letterSpacing: '0.08333em',
                textTransform: 'uppercase',
            },
        },
    });

    const backgroundColor = them.palette.background.default;
    const color = them.palette.text.primary;
    const value = { theme, backgroundColor, color, switchMode, showSidebar, switchSidebar };

    return (
        <ThemeMuiContext.Provider value={value}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeMuiContext.Provider>
    );
}

export default ThemeMuiContextProvider;
