import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/Context';

export default function StartDrinkRecipeBtn() {
  const { saveId } = useContext(context);
  const history = useHistory();
  return (
    <div className="div-start-recipe-btn">
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => history.push(`/drinks/${saveId}/in-progress`) }
      >
        Start Recipe
      </button>
    </div>
  );
}
