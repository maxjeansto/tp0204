# Changer entre le thème sombre et clair avec Material-UI V5 et React

Ce document explique comment configurer une application React pour permettre aux utilisateurs de basculer entre un thème sombre et un thème clair en utilisant Material-UI V5.

## Étapes

1. Commencez par définir vos thèmes dans un fichier séparé. Dans notre cas, nous avons un fichier `theme.js` qui définit les thèmes sombre et clair.

```jsx
import { createTheme } from '@mui/material/styles';

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

export { lightTheme, darkTheme };
```

2. Modifier le fichier `theme.js` pour qu'il fournisse un `ThemeProvider` ainsi que le contexte pour changer de thème.

```jsx
import * as React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

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
```

3. Utilisez le nouveau `ThemeProvider` dans votre fichier `index.js` pour envelopper votre application :

```jsx
import { ThemeProvider } from './theme'; // ajustez le chemin selon l'emplacement de votre fichier theme.js

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store} >
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
```

4. Dans votre `Navbar` (ou n'importe quel autre composant où vous voulez placer le bouton pour changer de thème), utilisez `ThemeContext` pour accéder à la fonction `toggleTheme` :

```jsx
import { ThemeContext } from '../theme'; // ajustez le chemin selon l'emplacement de votre fichier theme.js

function Navbar() {
  // ...
  const { toggleTheme } = React.useContext(ThemeContext);

  return (
    <AppBar position="static">
      {/* ... */}
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton
          color="inherit"
          aria-label="Toggle theme"
          onClick={toggleTheme}  // Ajoutez cette ligne
        >
          <Brightness4Icon />  // Cet icône représente le changement de thème, vous pouvez choisir un autre si vous voulez
        </IconButton>
        {/* ... */}
      </Box>
      {/* ... */}
    </AppBar>
  );
}
```

Et voilà ! Votre application est maintenant capable de basculer entre un thème sombre et clair. Le choix du