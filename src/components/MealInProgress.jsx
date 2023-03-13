import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { useLocation } from 'react-router-dom';
import context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function MealInProgress({ handleClassChange }) {
  const { recipeInProgress, ingredientsChecked, isCopy, mealsDetails,
    setIsCopy, saveId, isMealFavorited, setIsMealFavorited } = useContext(context);
  const { idMeal, strCategory, strMeal, strMealThumb, strArea } = mealsDetails;
  let ingredients = [];
  let measure = [];
  const { pathname } = useLocation();
  const regex = /\d+/g;
  const idPage = pathname.match(regex);
  const typeOfRecipe = pathname.includes('/drinks') ? 'drinks' : 'meals';
  const alreadyFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  Object.entries(recipeInProgress).forEach((property) => {
    if (property[0].startsWith('strIngredient') && property[1]) {
      ingredients = [...ingredients, property[1]];
    }
    if (property[0].startsWith('strMeasure') && property[1]) {
      measure = [...measure, property[1]];
    }
  });

  const handleShare = (id) => {
    clipboardCopy(`http://localhost:3000/meals/${id}/in-progress`);
    setIsCopy(true);
  };

  useEffect(() => {
    const id = pathname.replace('/meals/', '');
    if (alreadyFavorite.some((favorite) => favorite.id === id)) {
      console.log('filtrei');
      setIsMealFavorited(!isMealFavorited);
    }
  }, []);

  const saveOnLocalStorage = () => {
    const id = pathname.replace('/meals/', '');
    const mealFavorite = {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    if (alreadyFavorite.some((favorite) => favorite.id === id)) {
      const newFavorites = alreadyFavorite.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsMealFavorited(!isMealFavorited);
    } else {
      alreadyFavorite.push(mealFavorite);
      if (alreadyFavorite) {
        localStorage
          .setItem('favoriteRecipes', JSON.stringify(alreadyFavorite));
        setIsMealFavorited(!isMealFavorited);
      } localStorage.setItem('favoriteRecipes', JSON.stringify(alreadyFavorite));
      setIsMealFavorited(!isMealFavorited);
    }
  };

  return (
    <div>
      <div key={ recipeInProgress.strMeal }>
        <button type="button" onClick={ saveOnLocalStorage }>
          { isMealFavorited
            ? <img src={ blackHeartIcon } alt="fav icon" data-testid="favorite-btn" />
            : <img src={ whiteHeartIcon } alt="fav icon" data-testid="favorite-btn" />}
        </button>
        {' '}
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => handleShare(saveId) }
        >
          <img src={ shareIcon } alt="share icon" />
        </button>
        { isCopy ? <span>Link copied!</span> : null}
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
                  className={ ingredientsChecked[0][typeOfRecipe][idPage]
                && ingredientsChecked[0][typeOfRecipe][idPage]
                  .includes(ingredient) ? 'ingredient-done' : null }
                >
                  {`${ingredient} -
                      ${measure[index] ? measure[index] : ''}`}
                  <input
                    type="checkbox"
                    key={ index }
                    value={ ingredient }
                    checked={ ingredientsChecked[0][typeOfRecipe][idPage]
                    && ingredientsChecked[0][typeOfRecipe][idPage].includes(ingredient) }
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
