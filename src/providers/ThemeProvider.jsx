import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import {
  createTheme,
  decomposeColor,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export function useColorModeContext() {
  return useContext(ColorModeContext);
}

export default function CustomStyles({ children }) {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    const customTheme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          mobile: 375,
          mobileLandscape: 480,
          sm: 600,
          tablet: 768,
          md: 900,
          desktop: 1024,
          lg: 1280,
          xl: 1536,
        },
      },
      mixins: {
        elevation: {
          '@media (min-width:0px)': '0',
          '@media (min-width:600px)': '1',
        },
        decomposeColor: (color, opacity) => {
          const {
            values: [r, g, b],
          } = decomposeColor(color);
          return `rgb(${r}, ${g}, ${b}, ${opacity || 1})`;
        },
      },
      palette: {
        mode,
        charcoal: {
          main: '#46494B',
          dark: '#2B2E2F',
          light: '#6E7375',
        },
        white: '#FFFFFF',
        black: '#000000',
        getColor,
      },
      shape: {
        backgroundGradient: {
          backgroundColor: `rgb(111,80,122)`,
          background: `linear-gradient(90deg, rgba(111,80,122,1) 0%, rgba(87,57,99,1) 80%)`,
        },
        borderRadius: 3,
      },
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true, // No more ripple, on the whole application 💣
          },
        },
        MuiButton: {
          defaultProps: {
            disableElevation: true,
            disableRipple: true,
            disableFocusRipple: true,
            disableTouchRipple: true,
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: 8, // Sets border radius for Dialog
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              borderRadius: 3, // Sets border radius for InputBase
            },
          },
        },
        MuiSkeleton: {
          defaultProps: {
            animation: false,
          },
        },
      },
    });

    // Make responsive!
    // See: https://material-ui.com/guides/responsive-ui/
    console.log(`%cCustomTheme`, 'color: #7FFFD4');
    console.log(customTheme);
    return responsiveFontSizes(customTheme);
  }, [mode]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <CssBaseline />
        {inputGlobalStyles}
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

CustomStyles.propTypes = {
  children: PropTypes.any,
};

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      'html, body, #root': {
        width: '100%',
        margin: 0,
        padding: 0,
      },
    }}
  />
);
