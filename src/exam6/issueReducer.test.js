import test from 'node:test';
import assert from 'node:assert/strict';
import { issueReducer, initialState } from './issueReducer.js';

test('ADD_ISSUE adds an issue and increments nextId', () => {
  const next = issueReducer(initialState, { type: 'ADD_ISSUE', payload: { title: 'Bug' } });
  assert.deepEqual(next.issues, [{ id: 1, title: 'Bug', done: false }]);
  assert.equal(next.nextId, 2);
  assert.equal(initialState.issues.length, 0); // original not mutated
});

test('TOGGLE_ISSUE flips done without mutating the old issue', () => {
  const start = { ...initialState, issues: [{ id: 1, title: 'A', done: false }], nextId: 2 };
  const next = issueReducer(start, { type: 'TOGGLE_ISSUE', payload: { id: 1 } });
  assert.equal(next.issues[0].done, true);
  assert.equal(start.issues[0].done, false);
});

test('CLEAR_DONE removes completed issues only', () => {
  const start = {
    ...initialState,
    nextId: 3,
    issues: [
      { id: 1, title: 'A', done: true },
      { id: 2, title: 'B', done: false },
    ],
  };
  const next = issueReducer(start, { type: 'CLEAR_DONE' });
  assert.deepEqual(next.issues.map((i) => i.id), [2]);
});