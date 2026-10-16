import { useState } from 'react';
import { initialState, issueReducer } from './issueReducer';
import { usePersistentReducer } from './usePersistentReducer';

export default function Exam6() {
  const [state, dispatch] = usePersistentReducer(issueReducer, initialState, 'issue-tracker-state');
  const [title, setTitle] = useState('');

  const counts = {
    all: state.issues.length,
    open: state.issues.filter((i) => !i.done).length,
    done: state.issues.filter((i) => i.done).length,
  };
  const visible = state.issues.filter((i) =>
    state.filter === 'all' ? true : state.filter === 'open' ? !i.done : i.done
  );

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_ISSUE', payload: { title } }); // payload shape matches reducer
    setTitle('');
  };

  return (
    <main>
      <h1>Issue Tracker</h1>
      <form onSubmit={handleAdd}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New issue title" />
        <button type="submit">Add</button>
      </form>

      <div>
        {['all', 'open', 'done'].map((f) => (
          <button key={f} onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: f } })}
            aria-pressed={state.filter === f}
            style={{ fontWeight: state.filter === f ? 'bold' : 'normal' }}>
            {f[0].toUpperCase() + f.slice(1)} ({counts[f]})
          </button>
        ))}
        <button onClick={() => dispatch({ type: 'CLEAR_DONE' })}>Clear done</button>
      </div>

      <ul>
        {visible.map((i) => (
          <li key={i.id}>
            <label>
              <input type="checkbox" checked={i.done}
                onChange={() => dispatch({ type: 'TOGGLE_ISSUE', payload: { id: i.id } })} />
              <span style={{ textDecoration: i.done ? 'line-through' : 'none' }}> #{i.id} {i.title}</span>
            </label>
            <button onClick={() => dispatch({ type: 'DELETE_ISSUE', payload: { id: i.id } })}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}