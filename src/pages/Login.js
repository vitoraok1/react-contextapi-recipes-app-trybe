import React from 'react';

export default function Login() {
  return (
    <div>
      <form>
        <input type="email" data-testid="email-input" placeholder="Email" />
        <input type="password" data-testid="password-input" placeholder="Password" />
        <button type="button" data-testid="login-submit-btn">Enter</button>
      </form>
    </div>
  );
}
