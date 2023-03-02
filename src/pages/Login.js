import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassWord, setUserPassWord] = useState('');
  const [isEnterBtnDisabled, setEnterBtnDisabled] = useState(true);

  const handleValidate = (email, password) => {
    const regexMail = /\S+@\S+\.\S+/;
    const validateEmail = regexMail.test(email);
    const magicNumber = 6;

    if (validateEmail && password.length > magicNumber) {
      setEnterBtnDisabled(false);
    } else {
      setEnterBtnDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    const { value } = target;

    if (target.id === 'input-email') {
      setUserEmail(value);
      handleValidate(value, userPassWord);
    } else {
      setUserPassWord(value);
      handleValidate(userEmail, value);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
    history.push('/meals');
  };

  return (
    <div>
      <h1>Recipes App</h1>
      <h2>Login</h2>
      <form>
        <input
          type="email"
          id="input-email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ handleChange }
        />
        <input
          type="password"
          id="input-password"
          data-testid="password-input"
          placeholder="Password"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isEnterBtnDisabled }
          onClick={ handleClick }
        >
          Enter

        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default Login;
