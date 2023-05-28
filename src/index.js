import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "./i18n/config"
import { Provider } from 'react-redux';
import store from './components/redux/store/store';
import { ThemeProvider } from './components/theme'; // Ajustez le chemin selon l'emplacement de votre fichier theme.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
    <Provider store={store} >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
    </BrowserRouter>
);

reportWebVitals();
