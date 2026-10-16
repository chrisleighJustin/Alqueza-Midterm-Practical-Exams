import { useRef, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Exam3() {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [previousEmail, setPreviousEmail] = useState('');

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const lastEmailRef = useRef(''); // survives renders, changing it doesn't render

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Name is required.';
    if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.';
    if (values.password.length < 8) next.password = 'Password must be at least 8 characters.';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    setSuccess(false);

    // Focus order: name, email, password (in the event handler, not render)
    if (next.name) return nameRef.current.focus();
    if (next.email) return emailRef.current.focus();
    if (next.password) return passwordRef.current.focus();

    // Successful submission
    setPreviousEmail(lastEmailRef.current); // show the PREVIOUS one
    lastEmailRef.current = values.email;    // remember this one (no render)
    setSuccess(true);
    setValues({ name: '', email: '', password: '' });
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Name</label><br />
          <input id="name" name="name" ref={nameRef} value={values.name}
            onChange={handleChange} aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-err' : undefined} />
          {errors.name && <p id="name-err" className="error" role="alert">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label><br />
          <input id="email" name="email" type="email" ref={emailRef} value={values.email}
            onChange={handleChange} aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-err' : undefined} />
          {errors.email && <p id="email-err" className="error" role="alert">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label><br />
          <input id="password" name="password" type="password" ref={passwordRef}
            value={values.password} onChange={handleChange}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'pw-err' : undefined} />
          {errors.password && <p id="pw-err" className="error" role="alert">{errors.password}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>

      {success && <p>Registration successful!</p>}
      <p>Previous submitted email: {previousEmail || '(none yet)'}</p>
    </main>
  );
}