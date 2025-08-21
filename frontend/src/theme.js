import { createTheme } from '@mui/material/styles';

export const getTheme = (darkMode) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#ffffff',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff',
    },
    background: {
      default: darkMode ? '#121212' : '#f5f5f5',
      paper: darkMode ? '#1e1e1e' : '#ffffff',
    },
    text: {
      primary: darkMode ? '#ffffff' : '#212121',
      secondary: darkMode ? '#b0b0b0' : '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2.125rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        },
        elevation3: {
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 600,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight: 700,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(224, 224, 224, 1)',
          padding: '16px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '24px 24px 16px 24px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '0 24px 24px 24px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px 24px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            minHeight: 48,
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'none',
          },
        },
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#f44336',
        },
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    '0 24px 48px rgba(0,0,0,0.35), 0 20px 15px rgba(0,0,0,0.20)',
    '0 29px 58px rgba(0,0,0,0.40), 0 25px 18px rgba(0,0,0,0.18)',
    '0 34px 68px rgba(0,0,0,0.45), 0 30px 21px rgba(0,0,0,0.16)',
    '0 39px 78px rgba(0,0,0,0.50), 0 35px 24px rgba(0,0,0,0.14)',
    '0 44px 88px rgba(0,0,0,0.55), 0 40px 27px rgba(0,0,0,0.12)',
    '0 49px 98px rgba(0,0,0,0.60), 0 45px 30px rgba(0,0,0,0.10)',
    '0 54px 108px rgba(0,0,0,0.65), 0 50px 33px rgba(0,0,0,0.08)',
    '0 59px 118px rgba(0,0,0,0.70), 0 55px 36px rgba(0,0,0,0.06)',
    '0 64px 128px rgba(0,0,0,0.75), 0 60px 39px rgba(0,0,0,0.04)',
    '0 69px 138px rgba(0,0,0,0.80), 0 65px 42px rgba(0,0,0,0.02)',
    '0 74px 148px rgba(0,0,0,0.85), 0 70px 45px rgba(0,0,0,0.00)',
    '0 79px 158px rgba(0,0,0,0.90), 0 75px 48px rgba(0,0,0,0.00)',
    '0 84px 168px rgba(0,0,0,0.95), 0 80px 51px rgba(0,0,0,0.00)',
    '0 89px 178px rgba(0,0,0,1.00), 0 85px 54px rgba(0,0,0,0.00)',
    '0 94px 188px rgba(0,0,0,1.00), 0 90px 57px rgba(0,0,0,0.00)',
    '0 99px 198px rgba(0,0,0,1.00), 0 95px 60px rgba(0,0,0,0.00)',
    '0 104px 208px rgba(0,0,0,1.00), 0 100px 63px rgba(0,0,0,0.00)',
    '0 109px 218px rgba(0,0,0,1.00), 0 105px 66px rgba(0,0,0,0.00)',
    '0 114px 228px rgba(0,0,0,1.00), 0 110px 69px rgba(0,0,0,0.00)',
    '0 119px 238px rgba(0,0,0,1.00), 0 115px 72px rgba(0,0,0,0.00)',
    '0 124px 248px rgba(0,0,0,1.00), 0 120px 75px rgba(0,0,0,0.00)',
  ],
}); 