// // src/authConfig.ts
// import { LogLevel, Configuration } from '@azure/msal-browser';

// export const msalConfig: Configuration = {
//   auth: {
//     clientId: 'YOUR_CLIENT_ID',
//     authority: 'https://YOUR_TENANT_NAME.b2clogin.com/YOUR_TENANT_NAME.onmicrosoft.com/B2C_1_SIGNIN',
//     knownAuthorities: ['YOUR_TENANT_NAME.b2clogin.com'],
//     redirectUri: 'http://localhost:3000',
//     postLogoutRedirectUri: 'http://localhost:3000',
//   },
//   cache: {
//     cacheLocation: 'localStorage', // This configures where your cache will be stored
//     storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
//   },
//   system: {
//     loggerOptions: {
//       loggerCallback: (level, message, containsPii) => {
//         if (containsPii) {
//           return;
//         }
//         // eslint-disable-next-line default-case
//         switch (level) {
//           case LogLevel.Error:
//             console.error(message);
//             return;
//           case LogLevel.Info:
//             console.info(message);
//             return;
//           case LogLevel.Verbose:
//             console.debug(message);
//             return;
//           case LogLevel.Warning:
//             console.warn(message);
//             return;
//         }
//       },
//     },
//   },
// };

// export const loginRequest = {
//   scopes: ['openid', 'profile', 'User.Read'],
// };
