// src/components/NavigationBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { useMsal } from '@azure/msal-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NavigationBar: React.FC = () => {
  // const { accounts, instance } = useMsal();
  // const userName = accounts[0]?.name || '';
  const { t } = useTranslation();

  // const handleLogout = () => {
  //   // instance.logoutRedirect().catch((error) => {
  //   //   console.error(error);
  //   // });
  // };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Melen App
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '20px' }}>
          {/* {userName} */}
        </Typography>
        <Button color="inherit" component={NavLink} to="/">
          {t('home')}
        </Button>
        {/* <Button color="inherit" component={NavLink} to="/profile">
          {t('profile')}
        </Button> */}
        <Button color="inherit" component={NavLink} to="/exercises">
          Movimientos Por Categoria
        </Button>
        <Button color="inherit" component={NavLink} to="/list">
          Todos Los Movimientos
        </Button>
        <Button color="inherit" component={NavLink} to="/editor">
          Crear Movimiento
        </Button>
        {/* <Button color="inherit" onClick={handleLogout}>        
          {t('logout')}
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
