# React Hooks Practical Exams

Six small React apps in one Vite project. Use the menu at the top to switch between exams.
Only React Hooks are used for state logic. No state management library is installed.

## How to run

    npm install
    npm run dev

Open the URL shown in the terminal (usually http://localhost:5173).

Reducer tests (Exam 6):

    npm test

---

## Exam 1: Smart Task Counter (useState)

**Completed requirements**
- [x] count and target state with valid initial values
- [x] Increment, Decrement, Reset (count never goes below 0)
- [x] Plus two using two queued functional updates
- [x] Status (Not started / In progress / Target reached) derived from state, not stored
- [x] Increment and Plus two disabled at the target

**Known limitations**
- Plus two adds exactly two, so it can pass the target by one (for example 4 + 2 = 6).
- Changing the target does not change the current count.

**Test steps**
1. Target 5, count 0: status is "Not started".
2. Click Increment to reach 4, then Plus two: count is 6 and status is "Target reached".
3. Count 0, click Decrement: count stays 0 and the button is disabled.
4. Reach the target, then Reset: count is 0 and the buttons are enabled again.

**Debugging case**
- Problem: `setCount(count + 1)` called twice only adds one.
- Why: inside one render, `count` is a fixed snapshot. Both calls queue "set to snapshot + 1", so the same value is set twice.
- Fix: `setCount(c => c + 1)` twice. React passes each updater the result of the previous one, so the result is +2.

---

## Exam 2: Live Search and Timer (useEffect)

**Completed requirements**
- [x] Users are filtered after the query changes, with a short simulated delay
- [x] The previous delayed search is cancelled
- [x] A one second session timer
- [x] The timer is cleaned up on unmount
- [x] The document title shows the number of visible results

**Known limitations**
- The search delay is a fixed 400 ms simulation using local data.

**Test steps**
1. Type quickly ("a", "an", "ana"): only the final result appears.
2. Watch the timer increase once per second.
3. Click "Unmount timer": it stops. Click "Mount timer": it starts again from 0.
4. Check the browser tab title changes with the result count.

**Debugging cases**
- Case 6: an effect that depends on the same state it updates runs again and again. Fix: depend on the real input (`[query]`) and filter from the original `USERS` array.
- Case 7: `setSeconds(seconds + 1)` inside `setInterval` captures the first value of `seconds`, so it stays at 1. Fix: `setSeconds(s => s + 1)`.
- Case 8: cleanup functions. `clearTimeout` cancels the pending search when the query changes or the component unmounts, so an old result cannot overwrite a newer one. `clearInterval` stops the timer when the component unmounts, so no duplicate timers keep running.

---

## Exam 3: Accessible Form Toolkit (useRef + useState)

**Completed requirements**
- [x] name, email, password inputs controlled by state
- [x] a ref for each input, attached with the ref attribute
- [x] validation: required name, valid email, password of at least 8 characters
- [x] focus moves to the first invalid field (name, then email, then password)
- [x] the previous submitted email is tracked in a ref (no extra render)

**Known limitations**
- The email check is a simple pattern, not full email validation.
- Nothing is sent to a server.

**Test steps**
1. Submit an empty form: focus goes to Name and all three messages show.
2. Fill the name and submit: focus goes to Email.
3. Fill the email and submit: focus goes to Password.
4. Submit successfully with one email, then again with a different email: the first email appears as "previous".

**Debugging case**
- Problem: `clicks.current` is shown on screen but the display does not update.
- Why: changing `ref.current` is a plain mutation. React is not notified, so it does not schedule a render.
- Fix: use `useState` for anything shown on screen, and keep refs for values that must not cause a render. `ref.current` is only used inside the submit handler, never during render.

---

## Exam 4: Application Preferences (useContext)

**Completed requirements**
- [x] one context object and one provider component
- [x] theme, fontSize, and update functions shared through context
- [x] light and dark theme toggle (Dashboard and ArticlePreview update together)
- [x] font size choices of 14, 16, and 18 pixels
- [x] `usePreferences` hook that throws a clear error outside the provider

**Known limitations**
- Preferences reset when the page is refreshed.

**Test steps**
1. Click the theme button: Dashboard and ArticlePreview both change.
2. Click 14px, 16px, 18px: the preview text size changes.
3. (Optional) render a consumer outside the provider to see the error message.

**Debugging cases**
- Case 9: a consumer without a provider only gets the default value. Fix: wrap the tree in `PreferencesProvider`.
- Case 10: if the provider and consumer each call `createContext`, they are two different objects and the consumer never sees the value. Fix: create the context once in `PreferencesContext.js` and import it everywhere.
- Case 11: context lets any descendant read the value directly from the nearest provider, so `Dashboard` and `Toolbar` no longer need to pass preference props down.

---

## Exam 5: Product Explorer Performance Repair (useMemo + useCallback)

**Completed requirements**
- [x] 600 generated products
- [x] text search, category selection, price sorting
- [x] filtered and sorted list memoized with `useMemo`
- [x] selection callback memoized with `useCallback`
- [x] `ProductList` wrapped in `React.memo`
- [x] unrelated counter in the parent does not re-render `ProductList`
- [x] dependency arrays are complete

**Known limitations**
- The filter is not artificially slow, so the speed difference is small. The evidence is the console output.
- `handleSelect` changes when `selectedId` changes, so the list re-renders on selection (this is expected).

**Test steps**
1. Open DevTools, then Console.
2. Click the unrelated counter several times: no "Filtering and sorting..." and no "ProductList rendered" lines appear.
3. Type in the search box or change category or sort: both lines appear.
4. Click a product: it becomes selected.

**Debugging cases**
- Case 12: a `useMemo` missing `query` in its dependency array shows stale results. Fix: add `query`.
- Case 13: a `useCallback` that reads `selectedId` but has `[]` uses the old value. Fix: add `selectedId` to the array.
- Case 14: an analytics call inside `useMemo` is a side effect. Fix: move it into `useEffect`.

**When memoization is unnecessary**
Joining two strings (`first + ' ' + last`) or filtering a list of about 10 items. The calculation is cheaper than comparing dependencies, and nothing depends on the result keeping the same reference.

---

## Exam 6: Issue Tracker State Engine (useReducer + custom Hook)

**Completed requirements**
- [x] reducer actions: ADD_ISSUE, TOGGLE_ISSUE, DELETE_ISSUE, SET_FILTER, CLEAR_DONE
- [x] reducer is pure and immutable
- [x] unknown actions return the existing state
- [x] `usePersistentReducer` with localStorage (loads once, saves on change)
- [x] All, Open, and Done views with accurate counts
- [x] three reducer tests (add, toggle, clear done)

**Known limitations**
- ADD_ISSUE ignores empty titles.
- Data is stored in the browser's localStorage only.

**Test steps**
1. Add a few issues, toggle some as done, and delete one.
2. Click All, Open, Done: the list and counts change correctly.
3. Click "Clear done": only open issues remain.
4. Refresh the page: the issues are still there.
5. Run `npm test`: 3 tests pass.

**Debugging cases**
- Case 15: mutating `state.issues[0].done = true` keeps the same reference. Fix: return a new state object and new issue objects where something changed.
- Case 16: the reducer reads `action.payload` but dispatch sent `action.title`. Fix: dispatch `{ type: 'ADD_ISSUE', payload: { title } }`.
- Case 17: a `default` branch that returns nothing makes the state `undefined`. Fix: `default: return state;`.