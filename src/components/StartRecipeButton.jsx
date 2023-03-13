import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export default function StartRecipeButton() {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <div className="div-start-recipe-btn">
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => history.push(`${pathname}/in-progress`) }
      >
        Start Recipe
      </button>
    </div>
  );
}
