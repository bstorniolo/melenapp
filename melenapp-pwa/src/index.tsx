// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
// import { PublicClientApplication } from '@azure/msal-browser';
// import { MsalProvider } from '@azure/msal-react';

import App from './App';
// import { msalConfig } from './config/authConfig';
// import './index.css';
import { CustomThemeProvider } from './ThemeContext';
import './config/i18n';

// const msalInstance = new PublicClientApplication(msalConfig);


ReactDOM.render(
    <React.StrictMode>
      {/* <MsalProvider instance={msalInstance}> */}
        <CustomThemeProvider>
          <App />
        </CustomThemeProvider>
      {/* </MsalProvider> */}
    </React.StrictMode>,
    document.getElementById('root')
  );
  