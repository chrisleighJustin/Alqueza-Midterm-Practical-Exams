import { useState } from 'react';
import Exam1 from './exam1/Exam1';
import Exam2 from './exam2/Exam2';
import Exam3 from './exam3/Exam3';
import Exam4 from './exam4/Exam4';
import Exam5 from './exam5/Exam5';
import Exam6 from './exam6/Exam6';

const EXAMS = [Exam1, Exam2, Exam3, Exam4, Exam5, Exam6];

export default function App() {
  const [current, setCurrent] = useState(0);
  const Current = EXAMS[current];

  return (
    <>
      <nav>
        {EXAMS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            style={{ fontWeight: current === i ? 'bold' : 'normal' }}>
            Exam {i + 1}
          </button>
        ))}
      </nav>
      <hr />
      <Current />
    </>
  );
}