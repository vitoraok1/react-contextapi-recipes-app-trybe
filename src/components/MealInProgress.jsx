import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../context/Context';

function MealInProgress({ handleClassChange }) {
  const { recipeInProgress, ingredientsChecked } = useContext(context);
  let ingredients = [];
  let measure = [];
  const { pathname } = window.location;
  const regex = /\d+/g;
  const id = pathname.match(regex);
  const typeOfRecipe = pathname.includes('/drinks') ? 'drinks' : 'meals';

  Object.entries(recipeInProgress).forEach((property) => {
    if (property[0].startsWith('strIngredient') && property[1]) {
      ingredients = [...ingredients, property[1]];
    }
    if (property[0].startsWith('strMeasure') && property[1]) {
      measure = [...measure, property[1]];
    }
  });

  return (
    <div>
      <div key={ recipeInProgress.strMeal }>
        <button
          name="share-button"
          data-testid="share-btn"
        >
          Compartilhar

        </button>
        <button
          name="favorite-button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
        <h1 data-testid="recipe-title">
          Nome:
          {' '}
          {recipeInProgress.strMeal}

        </h1>
        <h3 data-testid="recipe-category">
          Categoria:
          {' '}
          {recipeInProgress.strCategory}
        </h3>
        <img
          data-testid="recipe-photo"
          alt={ recipeInProgress.strMeal }
          src={ recipeInProgress.strMealThumb }
        />
        <p data-testid="instructions">
          Modo de preparo:
          {' '}
          {recipeInProgress.strInstructions}
        </p>
        <h3>Ingredientes</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={ index }>
              <div className="checkBoxItens">
                {' '}
                <label
                  data-testid={ `${index}-ingredient-step` }
                  className={ ingredientsChecked[0][typeOfRecipe][id]
                && ingredientsChecked[0][typeOfRecipe][id]
                  .includes(ingredient) ? 'ingredient-done' : null }
                >
                  {`${ingredient} -
                      ${measure[index] ? measure[index] : ''}`}
                  <input
                    type="checkbox"
                    key={ index }
                    value={ ingredient }
                    checked={ ingredientsChecked[0][typeOfRecipe][id]
                    && ingredientsChecked[0][typeOfRecipe][id].includes(ingredient) }
                    onChange={ handleClassChange }
                  />
                </label>
              </div>
            </li>
          ))}
        </ul>
        <button
          name="finish-button"
          data-testid="finish-recipe-btn"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}

MealInProgress.propTypes = {
  handleClassChange: PropTypes.func.isRequired,
};

export default MealInProgress;
