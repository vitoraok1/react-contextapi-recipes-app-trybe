import React from 'react';
import { useHistory } from 'react-router-dom';

export default function StartRecipeButton() {
  const history = useHistory();

  return (
    <div className="div-start-recipe-btn">
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => history.push(`${window.location.pathname}/in-progress`) }
      >
        Start Recipe
      </button>
    </div>
  );
}
