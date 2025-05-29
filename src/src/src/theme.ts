import { createTheme } from '@mui/material/styles';

// Opinion Brand colors
const colors = {
  primary: {
    main: '#0066CC', // Primary blue
    light: '#4D94E0',
    dark: '#004C99',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF9E1B', // Secondary orange
    light: '#FFBE5C',
    dark: '#D97800',
    contrastText: '#000000',
  },
  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#ED6C02',
    light: '#FF9800',
    dark: '#E65100',
    contrastText: '#000000',
  },
  info: {
    main: '#0288D1',
    light: '#03A9F4',
    dark: '#01579B',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  background: {
    default: '#F5F7FA',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
    disabled: '#9E9E9E',
  },
};

// Create theme
const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    success: colors.success,
    background: colors.background,
    text: colors.text,
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontFamily: '"Century Gothic Bold", Arial, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Century Gothic Bold", Arial, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Century Gothic Bold", Arial, sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Century Gothic Bold", Arial, sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Century Gothic Bold", Arial, sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Century Gothic Bold", Arial, sans-serif',
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: '8px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.secondary.dark} 100%)`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.grey[300],
            },
            '&:hover fieldset': {
              borderColor: colors.primary.light,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.main,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontFamily: '"Century Gothic Bold", Arial, sans-serif',
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;
