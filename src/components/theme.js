import * as React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // ajoutez ici les autres options de thème spécifiques à Light
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // ajoutez ici les autres options de thème spécifiques à Dark
  },
});

// Créez un contexte de thème pour partager la fonction toggleTheme
export const ThemeContext = React.createContext({
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(lightTheme);

  const toggleTheme = () => {
    setTheme((currentTheme) => 
      currentTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
