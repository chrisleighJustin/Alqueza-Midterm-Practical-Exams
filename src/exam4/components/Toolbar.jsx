import { usePreferences } from '../context/usePreferences';

export default function Toolbar() {
  const { theme, toggleTheme } = usePreferences();
  return (
    <div>
      <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'dark' : 'light'} theme</button>
    </div>
  );
}