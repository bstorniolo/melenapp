import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CustomThemeProvider } from './ThemeContext';
import './config/i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  </StrictMode>,
)


// import { PublicClientApplication } from '@azure/msal-browser';
// import { MsalProvider } from '@azure/msal-react';

// import { msalConfig } from './config/authConfig';

// const msalInstance = new PublicClientApplication(msalConfig);


// ReactDOM.render(
//     <React.StrictMode>
//       {/* <MsalProvider instance={msalInstance}> */}
//         <CustomThemeProvider>
//           <App />
//         </CustomThemeProvider>
//       {/* </MsalProvider> */}
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
  