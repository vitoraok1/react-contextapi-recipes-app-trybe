import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import context from '../context/Context';
import FavoriteButtonDrink from './FavoriteButtonDrink';
import ShareButton from './ShareButton';

function DrinkInProgress({ handleClassChange }) {
  const { recipeInProgress, ingredientsChecked, drinkDetails } = useContext(context);
  const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = drinkDetails;
  let ingredients = [];
  let measure = [];
  const today = new Date();
  const history = useHistory();
  const { pathname } = useLocation();
  const inProgress = pathname.replace('/in-progress', '');
  const id = inProgress.replace('/drinks/', '');
  const typeOfRecipe = inProgress.includes('/drinks') ? 'drinks' : 'meals';
  const storage = JSON.parse(localStorage
    .getItem('inProgressRecipes')) || [{ drinks: {}, meals: {} }];

  Object.entries(recipeInProgress).forEach((property) => {
    if (property[0].startsWith('strIngredient') && property[1]) {
      ingredients = [...ingredients, property[1]];
    }
    if (property[0].startsWith('strMeasure') && property[1]) {
      measure = [...measure, property[1]];
    }
  });

  const saveDoneRecipesOnLocalStorage = () => {
    const alreadyDone = [];
    const doneRecipe = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: today.toISOString(),
      tags: [],
    };
    alreadyDone.push(doneRecipe);
    localStorage
      .setItem('doneRecipes', JSON.stringify(alreadyDone));
    history.push('/done-recipes');
  };

  return (
    <div>
      <div key={ recipeInProgress.strDrink }>
        <FavoriteButtonDrink />
        {' '}
        <ShareButton />
        <h1 data-testid="recipe-title">

          {recipeInProgress.strDrink}

        </h1>
        <h3 data-testid="recipe-category">

          {recipeInProgress.strCategory}
        </h3>
        <img
          data-testid="recipe-photo"
          alt={ recipeInProgress.strDrink }
          src={ recipeInProgress.strDrinkThumb }
        />
        <p data-testid="instructions">
          Modo de preparo:
          <br />
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
      </div>
      <div className="div-start-recipe-btn">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="start-recipe-btn"
          disabled={ storage[0][typeOfRecipe][id]
            && !(ingredients.sort()
              .every((ingredient, index) => (
                ingredient === storage[0][typeOfRecipe][id].sort()[index]))) }
          onClick={ saveDoneRecipesOnLocalStorage }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}
DrinkInProgress.propTypes = {
  handleClassChange: PropTypes.func.isRequired,
};

export default DrinkInProgress;
