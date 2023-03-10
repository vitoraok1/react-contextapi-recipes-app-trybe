import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import { getRecipesById } from '../services/drinksAndMeals';
import context from '../context/Context';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const { recipeInProgress, setRecipeInProgress } = useContext(context);

  const { pathname } = window.location;
  const regex = /\d+/g;
  const id = pathname.match(regex);
  let ingredients = [];
  let measure = [];
  const drinksPage = pathname.includes('/drinks');
  const typeOfRecipe = pathname.includes('/drinks') ? 'drinks' : 'meals';

  useEffect(() => {
    const type = pathname.includes('/meals') ? 'themealdb' : 'thecocktaildb';

    const fetchRecipes = async () => {
      setRecipeInProgress(await getRecipesById(type, id));
    };
    fetchRecipes();
  }, []);

  const handleClassChange = ({ target }) => {
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const previousStorage = inProgressStorage || [];
    const { value } = target;

    if (target.checked && !inProgressStorage) {
      if (typeOfRecipe === 'drinks') {
        localStorage.setItem('inProgressRecipes', JSON.stringify([{
          drinks: {
            [id]: [value],
          },
          meals: {},
        }]));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify([{
          drinks: {},
          meals: {
            [id]: [value],
          },
        }]));
      }
    } else if (target.checked && inProgressStorage[0][typeOfRecipe][id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify([{ ...previousStorage[0],
        [typeOfRecipe]: {
          [id]: [...previousStorage[0][typeOfRecipe][id], value],
        },
      }]));
    } else if (!target.checked && previousStorage[0][typeOfRecipe][id]
      .some((ingredient) => ingredient === value)) {
      const newIngredient = previousStorage[0][typeOfRecipe][id]
        .filter((ingredient) => ingredient !== value);
      localStorage.setItem('inProgressRecipes', JSON.stringify([{
        [typeOfRecipe]: {
          [id]: newIngredient,
        },
      }]));
    }
  };

  // página de drinks a ser renderizada se drinksPage retornar true;\
  const drinkProgressPage = () => {
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
        <div key={ recipeInProgress.strDrink }>
          <button
            name="share-button"
            data-testid="share-btn"
            // onClick={}
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
            {recipeInProgress.strDrink}

          </h1>
          <h3 data-testid="recipe-category">
            Categoria:
            {' '}
            {recipeInProgress.strCategory}
          </h3>
          <img
            data-testid="recipe-photo"
            alt={ recipeInProgress.strDrink }
            src={ recipeInProgress.strDrinkThumb }
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
                  >
                    {`${ingredient} -
                          ${measure[index] ? measure[index] : ''}`}
                    <input
                      type="checkbox"
                      key={ index }
                      value={ ingredient }
                      onChange={ handleClassChange }
                    />
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          name="finish-button"
          data-testid="finish-recipe-btn"
        >
          Finalizar
        </button>
      </div>
    );
  };
  // página de meals a ser renderizada se drinksPage retornar false;
  const mealProgressPage = () => {
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
                  <label data-testid={ `${index}-ingredient-step` }>
                    {`${ingredient} -
                          ${measure[index] ? measure[index] : ''}`}
                    <input
                      type="checkbox"
                      key={ index }
                      value={ ingredient }
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
  };

  return (
    <div>
      {drinksPage ? drinkProgressPage() : mealProgressPage() }
      <Footer />
    </div>
  );
}

export default RecipeInProgress;
