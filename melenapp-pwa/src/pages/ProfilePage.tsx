// src/pages/ProfilePage.tsx
import React from 'react';
import { Container, Typography, Switch, FormControlLabel } from '@mui/material';
import { useMsal } from '@azure/msal-react';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '../ThemeContext';

const ProfilePage: React.FC = () => {
  const { accounts } = useMsal();
  const user = accounts[0];
  const theme = useTheme();
  const { toggleColorMode } = React.useContext(ThemeContext);

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="subtitle1">Name: {user.name}</Typography>
      <Typography variant="subtitle1">Email: {user.username}</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={theme.palette.mode === 'dark'}
            onChange={toggleColorMode}
            name="themeSwitch"
            color="primary"
          />
        }
        label="Dark Mode"
      />
    </Container>
  );
};

export default ProfilePage;
