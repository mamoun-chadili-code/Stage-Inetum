import { createTheme } from '@mui/material/styles';

// Palette de couleurs personnalisée
const colors = {
  // Couleurs principales
  primary: '#003366',      // Bleu foncé principal
  secondary: '#284D63',    // Bleu foncé secondaire
  accent: '#709CA7',       // Bleu-gris accent
  
  // Couleurs neutres
  dark: '#353535',         // Gris très foncé
  darkBlue: '#212E53',     // Bleu très foncé
  mediumBlue: '#344D59',   // Bleu moyen
  lightBlue: '#7A90A4',    // Bleu clair
  veryLightBlue: '#B8CBD0', // Bleu très clair
  lightGray: '#D9D9D9',    // Gris clair
  white: '#FFFFFF',        // Blanc
  
  // Couleurs sémantiques
  success: '#4caf50',      // Vert pour succès
  warning: '#ff9800',      // Orange pour avertissement
  error: '#f44336',        // Rouge pour erreur
  info: '#2196f3',         // Bleu pour information
};

export const customTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.lightBlue,
      dark: colors.darkBlue,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.secondary,
      light: colors.accent,
      dark: colors.mediumBlue,
      contrastText: colors.white,
    },
    background: {
      default: colors.white,
      paper: colors.white,
    },
    text: {
      primary: colors.dark,
      secondary: colors.mediumBlue,
    },
    grey: {
      50: colors.white,
      100: colors.veryLightBlue,
      200: colors.lightGray,
      300: colors.lightBlue,
      400: colors.accent,
      500: colors.mediumBlue,
      600: colors.secondary,
      700: colors.darkBlue,
      800: colors.dark,
      900: colors.dark,
    },
    success: {
      main: colors.success,
    },
    warning: {
      main: colors.warning,
    },
    error: {
      main: colors.error,
    },
    info: {
      main: colors.info,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: colors.primary,
      fontWeight: 700,
      fontSize: '2.5rem',
      textAlign: 'center',
      marginBottom: '1rem',
    },
    h2: {
      color: colors.primary,
      fontWeight: 600,
      fontSize: '2rem',
      marginBottom: '0.75rem',
    },
    h3: {
      color: colors.secondary,
      fontWeight: 600,
      fontSize: '1.75rem',
      marginBottom: '0.5rem',
    },
    h4: {
      color: colors.secondary,
      fontWeight: 500,
      fontSize: '1.5rem',
      marginBottom: '0.5rem',
    },
    h5: {
      color: colors.mediumBlue,
      fontWeight: 500,
      fontSize: '1.25rem',
      marginBottom: '0.5rem',
    },
    h6: {
      color: colors.primary,
      fontWeight: 600,
      fontSize: '1.125rem',
      marginBottom: '0.5rem',
    },
    subtitle1: {
      color: colors.mediumBlue,
      fontWeight: 500,
    },
    subtitle2: {
      color: colors.lightBlue,
      fontWeight: 400,
    },
    body1: {
      color: colors.dark,
      fontSize: '1rem',
    },
    body2: {
      color: colors.dark,
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          backgroundColor: colors.primary,
          color: colors.white,
          '&:hover': {
            backgroundColor: colors.secondary,
          },
        },
        outlined: {
          borderColor: colors.primary,
          color: colors.primary,
          '&:hover': {
            backgroundColor: colors.primary,
            color: colors.white,
          },
        },
        text: {
          color: colors.primary,
          '&:hover': {
            backgroundColor: colors.veryLightBlue,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.lightGray,
            },
            '&:hover fieldset': {
              borderColor: colors.lightBlue,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.mediumBlue,
            '&.Mui-focused': {
              color: colors.primary,
            },
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.lightGray,
            },
            '&:hover fieldset': {
              borderColor: colors.lightBlue,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.mediumBlue,
            '&.Mui-focused': {
              color: colors.primary,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.lightGray,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.lightBlue,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: `1px solid ${colors.lightGray}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.darkBlue,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.white,
          borderRight: `1px solid ${colors.lightGray}`,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: colors.veryLightBlue,
            '&:hover': {
              backgroundColor: colors.lightBlue,
            },
          },
          '&:hover': {
            backgroundColor: colors.veryLightBlue,
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: colors.veryLightBlue,
          '& .MuiTableCell-head': {
            color: colors.darkBlue,
            fontWeight: 600,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors.lightGray}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary,
          color: colors.white,
          '& .MuiTypography-root': {
            color: colors.white,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: colors.veryLightBlue,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
                     '&.section-title': {
             color: colors.primary,
             fontWeight: 700,
             fontSize: '1.5rem',
             textAlign: 'center',
             marginBottom: '1.5rem',
             paddingBottom: '0.5rem',
             textTransform: 'uppercase',
             letterSpacing: '0.5px',
           },
                     '&.module-title': {
             color: colors.primary,
             fontWeight: 600,
             fontSize: '1.25rem',
             marginBottom: '1rem',
             paddingBottom: '0.5rem',
             textTransform: 'uppercase',
             letterSpacing: '0.3px',
           },
                     '&.subsection-title': {
             color: colors.secondary,
             fontWeight: 500,
             fontSize: '1.125rem',
             marginBottom: '0.75rem',
             paddingBottom: '0.25rem',
           },
        },
      },
    },
  },
});

export default customTheme;
