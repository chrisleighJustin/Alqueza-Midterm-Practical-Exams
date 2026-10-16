import { usePreferences } from '../context/usePreferences';

export default function ArticlePreview() {
  const { theme, fontSize } = usePreferences();
  const dark = theme === 'dark';
  return (
    <article style={{
      fontSize: `${fontSize}px`,
      background: dark ? '#2b2b2b' : '#fff',
      color: dark ? '#f0f0f0' : '#111',
      padding: '1rem', border: '1px solid #888',
    }}>
      <h3>Article Preview</h3>
      <p>Hooks let function components use state and other React features without classes.</p>
    </article>
  );
}