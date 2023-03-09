import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/Context';

export default function StartMealRecipeBtn() {
  const { saveId } = useContext(context);
  const history = useHistory();
  return (
    <div className="div-start-recipe-btn">
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => history.push(`/meals/${saveId}/in-progress`) }
      >
        Start Recipe
      </button>
    </div>
  );
}
