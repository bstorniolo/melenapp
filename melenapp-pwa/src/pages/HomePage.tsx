// src/pages/HomePage.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
    const { t } = useTranslation();
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        {t('welcome-text')}
      </Typography>
      <Typography variant="body1">
        {t('welcome-desc')}
      </Typography>
      {/* TODO: Add components for user progress and suggestions */}
    </Container>
  );
};

export default HomePage;
