import { usePreferences } from '../context/usePreferences';
import Toolbar from './Toolbar';
import PreferencesPanel from './PreferencesPanel';
import ArticlePreview from './ArticlePreview';

export default function Dashboard() {
  const { theme } = usePreferences();
  const dark = theme === 'dark';
  return (
    <div style={{
      background: dark ? '#111' : '#f4f4f4',
      color: dark ? '#f0f0f0' : '#111',
      padding: '1rem', minHeight: '60vh',
    }}>
      <h1>Dashboard ({theme})</h1>
      <Toolbar />
      <PreferencesPanel />
      <ArticlePreview />
    </div>
  );
}