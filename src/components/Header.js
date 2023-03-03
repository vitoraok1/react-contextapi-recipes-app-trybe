import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from '../components/SearchBar';

function Header() {
  const [pageName, setPageName] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const replace = pathname.replace('/', '');
    const upperCaseReplace = replace[0].toUpperCase() + replace.substring(1);

    if (pathname.includes('-')) {
      const replace2 = pathname.replace('/', '');
      const wordSlice = replace2.split('-');
      const firstWord = wordSlice[0];
      const secondWord = wordSlice[1];
      const upperCaseFirstWord = firstWord[0].toUpperCase() + firstWord.substring(1);
      const upperCaseSecondWord = secondWord[0].toUpperCase() + secondWord.substring(1);
      const joinWords = `${upperCaseFirstWord} ${upperCaseSecondWord}`;
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
