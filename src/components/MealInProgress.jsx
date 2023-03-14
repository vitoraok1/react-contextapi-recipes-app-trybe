import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import context from '../context/Context';
import FavoriteButtonMeal from './FavoriteButtonMeal';
import ShareButton from './ShareButton';

function MealInProgress({ handleClassChange }) {
  const { recipeInProgress, ingredientsChecked, mealsDetails } = useContext(context);
  const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = mealsDetails;
  let ingredients = [];
  let measure = [];
  const today = new Date();
  const history = useHistory();
  const { pathname } = useLocation();
  const inProgress = pathname.replace('/in-progress', '');
  const id = inProgress.replace('/meals/', '');
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
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: today.toISOString(),
      tags: strTags.split(','),
    };
    console.log(doneRecipe);
    alreadyDone.push(doneRecipe);
    localStorage
      .setItem('doneRecipes', JSON.stringify(alreadyDone));
    history.push('/done-recipes');
  };

  return (
    <div>
      <div key={ recipeInProgress.strMeal }>
        <FavoriteButtonMeal />
        {' '}
        <ShareButton />
        <h1 data-testid="recipe-title">

          {recipeInProgress.strMeal}

        </h1>
        <h3 data-testid="recipe-category">

          {recipeInProgress.strCategory}
        </h3>
        <img
          data-testid="recipe-photo"
          alt={ recipeInProgress.strMeal }
          src={ recipeInProgress.strMealThumb }
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
    </div>
  );
}

MealInProgress.propTypes = {
  handleClassChange: PropTypes.func.isRequired,
};

export default MealInProgress;
