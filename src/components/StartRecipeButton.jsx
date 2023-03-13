import React from 'react';
import { useHistory } from 'react-router-dom';

export default function StartRecipeButton() {
  const history = useHistory();
  const storage = JSON.parse(localStorage
    .getItem('inProgressRecipes')) || [{ drinks: { }, meals: { } }];
  const { pathname } = window.location;
  const regex = /\d+/g;
  const regexId = pathname.match(regex);
  const id = regexId.shift();
  const typeOfRecipe = pathname.includes('/drinks') ? 'drinks' : 'meals';

  return (
    <div className="div-start-recipe-btn">
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => history.push(`${window.location.pathname}/in-progress`) }
      >
        {(Object.keys(storage[0][typeOfRecipe]).includes(id))
          ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}
