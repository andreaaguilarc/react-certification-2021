import React from 'react';
import { useHistory } from 'react-router';

import { useAuth } from '../../providers/Auth';
import { USER, PASS } from './mockData';
import './Login.styles.css';

function LoginPage() {
  const { login } = useAuth();
  const history = useHistory();

  const validateCredentials = (user, pass) => {
    let error = {
      user: false,
      pass: false,
    };

    if (user !== USER) {
      error.user = true;
    }
    if (pass !== PASS) {
      error.pass = true;
    }

    return error;
  };
  function authenticate(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginStatus = validateCredentials(username, password);
    if (!loginStatus.user && !loginStatus.pass) {
      login(username);
      history.push('/home');
    }
    if (loginStatus.user) {
      console.log('Wrong user');
    }
    if (loginStatus.pass) {
      console.log('Wrong password');
    }
    if (loginStatus.user && loginStatus.pass) {
      console.log('Wrong credentials!');
    }
  }

  return (
    <section className="login" style={{ marginLeft: '40vw', paddingTop: '20vh' }}>
      <h1>Welcome back!</h1>
      <form onSubmit={authenticate} className="login-form">
        <div className="form-group">
          <label htmlFor="username">
            <strong>username </strong>
            <input required type="text" id="username" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <strong>password </strong>
            <input required type="password" id="password" />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </section>
  );
}

export default LoginPage;
