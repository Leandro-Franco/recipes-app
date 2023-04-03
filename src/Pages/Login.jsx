import { useState } from 'react';

function Login() {
  // const [user, setUser] = useState({
  //   email: '',
  //   senha: '',
  // });

  return (
    <form>
      <label htmlFor="email-input">
        Email:
        <input
          type="email"
          id="email-input"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          type="password"
          id="password-input"
          data-testid="password-input"
        />
      </label>
      <button type="submit" data-testid="login-submit-btn">Entrar</button>
    </form>
  );
}

export default Login;
