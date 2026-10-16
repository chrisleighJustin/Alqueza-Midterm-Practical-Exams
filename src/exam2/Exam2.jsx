import { useEffect, useState } from 'react';

const USERS = [
  { id: 1, name: 'Ana Cruz', role: 'Developer' },
  { id: 2, name: 'Ben Lim', role: 'Designer' },
  { id: 3, name: 'Cara Yu', role: 'Tester' },
  { id: 4, name: 'Dan Go', role: 'Developer' },
];

function SessionTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1); // functional update: never stuck at 1
    }, 1000);
    return () => clearInterval(id); // cleanup on unmount
  }, []);

  return <p>Session time: {seconds}s</p>;
}

export default function Exam2() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(USERS);
  const [loading, setLoading] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  // Simulated search with cancellation
  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      const q = query.trim().toLowerCase();
      setResults(
        USERS.filter(
          (u) => u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)
        )
      );
      setLoading(false);
    }, 400);
    return () => clearTimeout(id); // cancels the previous delayed search
  }, [query]);

  // Sync document title with result count
  useEffect(() => {
    document.title = `${results.length} result(s)`;
  }, [results.length]);

  return (
    <main>
      <h1>User Search</h1>
      <button onClick={() => setShowTimer((v) => !v)}>
        {showTimer ? 'Unmount timer' : 'Mount timer'}
      </button>
      {showTimer && <SessionTimer />}

      <input
        placeholder="Search name or role"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Searching…</p>}
      <ul>
        {results.map((u) => (
          <li key={u.id}>{u.name} — {u.role}</li>
        ))}
      </ul>
    </main>
  );
}