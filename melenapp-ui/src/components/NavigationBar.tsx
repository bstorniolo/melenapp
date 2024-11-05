// src/components/NavigationBar.tsx
import React, {useState} from 'react';
import { AppBar, Box, Toolbar, Drawer, Typography, List, Button, ListItemIcon, ListItemText, Menu, MenuItem} from '@mui/material';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AccountCircle from '@mui/icons-material/AccountCircle';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import CssBaseline from '@mui/material/CssBaseline';

const NavigationBar: React.FC = () => {
  const { accounts, instance } = useMsal();
  const userName = accounts[0]?.name || '';
  const isAuthenticated = useIsAuthenticated();
  const { t } = useTranslation();
  

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);



  const loginRequest = {
    scopes: ['openid'],
    extraQueryParameters: { ui_locales: 'es' },
  };

  const handleLogin = () => {
    setAnchorEl(null);
    instance.loginRedirect(loginRequest);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    instance.logoutRedirect().catch((error) => {
      console.error(error);
    });
  };

  const isMenuOpen = Boolean(anchorEl);
  const [drawerOpen, setDrawerOpen] = useState(false);


  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';
  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };



  return (
    <>
    <CssBaseline />
     {/* <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}> */}
    <AppBar component="nav" position="static" >
      <Toolbar >


      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
          
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
            <MenuIcon />
          </IconButton>
        
          <Typography 
            variant="h6" 
            component="a"
            noWrap
            href="/"
            sx={{ 
              flexGrow: 1 ,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: 'inherit',
                textDecoration: 'none',
              },
            }}
            
          >
            Melen App
          </Typography>


        <Button color="inherit" component={NavLink} to="/exercises">
          Movimientos Por Categoria
        </Button>
        <Button color="inherit" component={NavLink} to="/list">
          Todos Los Movimientos
        </Button>
        <Button color="inherit" component={NavLink} to="/editor">
          Crear Movimiento
        </Button>



        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List>
                <MenuItem component={NavLink} to="/exercises" onClick={toggleDrawer(false)}>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="subtitle1">Movimientos Por Categoria</Typography>
                  </ListItemText>
                </MenuItem>
                
                <MenuItem component={NavLink} to="/list" onClick={toggleDrawer(false)}>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="subtitle1">Todos Los Movimientos</Typography>
                  </ListItemText>
                </MenuItem>
                
                <MenuItem component={NavLink} to="/editor" onClick={toggleDrawer(false)}>
                  <ListItemIcon>
                    <AddCircleIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="subtitle1">Crear Movimiento</Typography>
                  </ListItemText>
                </MenuItem>
               
              </List>

            </Drawer>



        </Box>

        <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
      </Toolbar>
    </AppBar>

    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated ? (
          <Box>
            <Typography variant="subtitle1" style={{ marginRight: '20px' }}>
                    Bienvenido {userName}
            </Typography>
            <MenuItem onClick={handleLogout}>
              {t('logout')}
            </MenuItem>
          </Box>
        ) : (
          <MenuItem onClick={handleLogin}>
            {t('login')}
          </MenuItem>
        )}

    </Menu>

    </>
  );
};

export default NavigationBar;
