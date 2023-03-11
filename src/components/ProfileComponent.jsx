import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function ProfileComponent() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const handleDoneRecipesClick = () => {
    history.push('/done-recipes');
  };
  const handleFavoriteRecipesClick = () => {
    history.push('/favorite-recipes');
  };
  const handleLogoutClick = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    const userEmail = localStorage.getItem('user');
    setEmail(userEmail);
  }, []);

  return (
    <div>
      <p>
        Email:
        <span data-testid="profile-email">{email}</span>
      </p>
      <button
        data-testid="profile-done-btn"
        onClick={ handleDoneRecipesClick }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ handleFavoriteRecipesClick }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleLogoutClick }
      >
        Logout
      </button>
    </div>
  );
}
