import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ProfileComponent from '../components/ProfileComponent';

describe('ProfileComponent', () => {
  beforeEach(() => {
    localStorage.setItem('user', 'test@example.com');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('displays the user email', () => {
    render(<ProfileComponent />);
    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toHaveTextContent('test@example.com');
  });

  it('redirects to Done Recipes page when the Done Recipes button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <ProfileComponent />
      </Router>,
    );
    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    fireEvent.click(doneRecipesButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
