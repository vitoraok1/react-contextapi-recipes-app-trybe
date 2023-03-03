import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [pageName, setPageName] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const replaceWord = pathname.replace('/', '');
    const upperCaseReplace = replaceWord
      .charAt(0).toUpperCase() + replaceWord.substring(1);

    if (replaceWord.includes('-')) {
      const wordSlice = replaceWord.split('-');
      const firstWord = wordSlice[0];
      const secondWord = wordSlice[1];
      const joinWords = `${firstWord.charAt(0).toUpperCase() + firstWord.substring(1)}
       ${secondWord.charAt(0).toUpperCase() + secondWord.substring(1)}`;
      setPageName(joinWords);
    } else setPageName(upperCaseReplace);
  }, [pathname]);
  return (
    <div>
      <button onClick={ () => history.push('/profile') }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile Icon" />
      </button>
      {!pathname.includes('profile') && !pathname.includes('done-recipes')
        && !pathname.includes('favorite-recipes') ? (
          <button onClick={ () => setActiveSearch(!activeSearch) }>
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search Icon" />
          </button>) : null}
      {activeSearch ? <SearchBar /> : null}
      <h1 data-testid="page-title">{pageName}</h1>
    </div>
  );
}

export default Header;
