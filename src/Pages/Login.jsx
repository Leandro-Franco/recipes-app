import { useState } from 'react';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleValidation = () => {
    const { email, password } = user;
    const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
    const minLength = 6;
    const passwordValidation = password.length < minLength;

    setIsDisabled(!emailValidation || passwordValidation);
  };

  return (
    <form onSubmit={ (e) => handleSubmit(e) }>
      <label htmlFor="email-input">
        Email:
        <input
          type="email"
          value={ user.email }
          id="email-input"
          onChange={ ({ target: { value } }) => {
            setUser({ ...user, email: value });
            handleValidation();
          } }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          type="password"
          value={ user.password }
          id="password-input"
          onChange={ ({ target: { value } }) => {
            setUser({ ...user, password: value });
            handleValidation();
          } }
          data-testid="password-input"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Entrar

      </button>
    </form>
  );
}

export default Login;
