import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import ThemeContextProvider, { useThemes } from '@context/themeContext';
import AuthContextProvider from '@context/authContext';

const ContexedApp = ({ children }: { children: React.ReactNode }) => {
  const themes = {
    dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
    light: `${process.env.PUBLIC_URL}/light-theme.css`,
  };
  const { theme } = useThemes();
  return (
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={theme}>
      {children}
    </ThemeSwitcherProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <ContexedApp>
            <App />
          </ContexedApp>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
