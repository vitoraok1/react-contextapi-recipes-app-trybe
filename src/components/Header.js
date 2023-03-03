import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [pageName, setPageName] = useState('');
  const history = useHistory();

  return (
    <div>
      <button data-testid="profile-top-btn" onClick={ history.push('/profile') }>
        <img
          src={ profileIcon }
          alt="Profile Icon"
        />
      </button>
      <button data-testid="search-top-btn" onClick={ history.push('/profile') }>
        <img
          src={ searchIcon }
          alt="Search Icon"
        />
      </button>
      <h1>{pageName}</h1>
    </div>
  );
}

export default Header;
