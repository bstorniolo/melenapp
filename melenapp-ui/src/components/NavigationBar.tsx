// src/components/NavigationBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NavigationBar: React.FC = () => {
  const { accounts, instance } = useMsal();
  const userName = accounts[0]?.name || '';

  const isAuthenticated = useIsAuthenticated();
  const { t } = useTranslation();
  
  const loginRequest = {
    scopes: ['openid'],
    extraQueryParameters: { ui_locales: 'es' },
  };

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch((error) => {
      console.error(error);
    });
  };
  // console.log(accounts);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Melen App
        </Typography>

        <Button color="inherit" component={NavLink} to="/">
          {t('home')}
        </Button>
        <Button color="inherit" component={NavLink} to="/exercises">
          Movimientos Por Categoria
        </Button>
        <Button color="inherit" component={NavLink} to="/list">
          Todos Los Movimientos
        </Button>
        <Button color="inherit" component={NavLink} to="/editor">
          Crear Movimiento
        </Button>

        {/* <Button color="inherit" component={NavLink} to="/profile">
          {t('profile')} 
        </Button> */}
        {isAuthenticated ? (
          <>
            <Typography variant="subtitle1" style={{ marginRight: '20px' }}>
                    Bienvenido {userName}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              {t('logout')}
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            {t('sign_up')}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
