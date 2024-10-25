import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();  // Hook from react-router-dom

  const handleBack = () => {

    // eslint-disable-next-line no-restricted-globals
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      pathSegments.pop();
      const newPath = `/${pathSegments.join('/')}`;
      navigate(newPath || '/');
    } else {
      // If there are no segments, navigate to home
      navigate('/');
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleBack}>
      Atras
    </Button>
  );
};

export default BackButton;
