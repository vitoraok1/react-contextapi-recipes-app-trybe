import React, { useState } from 'react';

export default function Login() {
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

  return (
    <div>
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
        >
          Enter

        </button>
      </form>
    </div>
  );
}
