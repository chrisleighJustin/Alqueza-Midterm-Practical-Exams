import { useCallback, useMemo, useState } from 'react';
import { PreferencesContext } from './PreferencesContext';

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    []
  );

  const value = useMemo(
    () => ({ theme, fontSize, toggleTheme, setFontSize }),
    [theme, fontSize, toggleTheme]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}