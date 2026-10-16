import { usePreferences } from '../context/usePreferences';
import { FONT_SIZES } from '../context/PreferencesContext';

export default function PreferencesPanel() {
  const { fontSize, setFontSize } = usePreferences();
  return (
    <section>
      <h3>Font size</h3>
      {FONT_SIZES.map((size) => (
        <button key={size} onClick={() => setFontSize(size)} aria-pressed={fontSize === size}
          style={{ fontWeight: fontSize === size ? 'bold' : 'normal' }}>
          {size}px
        </button>
      ))}
    </section>
  );
}