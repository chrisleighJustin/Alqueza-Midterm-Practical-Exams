import { PreferencesProvider } from './context/PreferencesProvider';
import Dashboard from './components/Dashboard';

export default function Exam4() {
  return (
    <PreferencesProvider>
      <Dashboard />
    </PreferencesProvider>
  );
}