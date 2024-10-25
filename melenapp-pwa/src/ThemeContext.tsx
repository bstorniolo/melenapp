// src/ThemeContext.tsx
import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';

interface ThemeContextProps {
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  toggleColorMode: () => {},
});

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
