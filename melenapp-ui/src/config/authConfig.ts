// src/authConfig.ts

// Application (client) ID:2d5858f7-f43e-4d8c-af48-1467d6d6c824
// Object ID:ee4da672-6791-4902-a02d-dacfbcf472f5
// Directory (tenant) ID:d04931e4-9259-48a2-8704-a0bdfaec7860


import { LogLevel, Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '2d5858f7-f43e-4d8c-af48-1467d6d6c824',
    authority: 'https://Melenaap.b2clogin.com/Melenaap.onmicrosoft.com/B2C_1_melenapp_user_flow_signup_login',
    knownAuthorities: ['Melenaap.b2clogin.com'],
    // redirectUri: 'http://localhost:5173',
    // postLogoutRedirectUri: 'http://localhost:5173',
    redirectUri: 'https://lively-flower-056905a0f.5.azurestaticapps.net',
    postLogoutRedirectUri: 'https://lively-flower-056905a0f.5.azurestaticapps.net',
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        // eslint-disable-next-line default-case
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ['openid', 'profile', 'User.Read'],
};
