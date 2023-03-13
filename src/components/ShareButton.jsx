import React, { useContext } from 'react';
import clipboardCopy from 'clipboard-copy';
import context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton() {
  const { isCopy, setIsCopy } = useContext(context);

  const handleShare = () => {
    const { pathname } = window.location;
    const inProgress = pathname.replace('/in-progress', '');
    clipboardCopy(`http://localhost:3000${inProgress}`);
    setIsCopy(true);
  };
  return (
    <div>
      <button type="button" data-testid="share-btn" onClick={ handleShare }>
        <img src={ shareIcon } alt="share icon" />
      </button>
      { isCopy ? <span>Link copied!</span> : null}
    </div>
  );
}
