import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ProfileComponent from '../components/ProfileComponent';

describe('ProfileComponent', () => {
  it('should render user email', () => {
    const emailExample = 'test@test.com';
    localStorage.setItem('user', emailExample);
    render(<ProfileComponent />);
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
    expect(userEmail).toHaveTextContent(emailExample);
    localStorage.clear();
  });

  it('should redirect to Done Recipes page when Done Recipes button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <ProfileComponent />
      </Router>,
    );
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    fireEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('should redirect to Favorite Recipes page when Favorite Recipes button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <ProfileComponent />
      </Router>,
    );
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteRecipesBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('should clear localStorage and redirect to Login page when Logout button is clicked', () => {
    localStorage.setItem('user', 'test@test.com');
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <ProfileComponent />
      </Router>,
    );
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    fireEvent.click(logoutBtn);
    expect(localStorage.length).toBe(0);
    expect(history.location.pathname).toBe('/');
  });
});
