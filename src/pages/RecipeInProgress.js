import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import { getRecipesById } from '../services/drinksAndMeals';
import context from '../context/Context';
import DrinkInProgress from '../components/DrinkInProgress';
import MealInProgress from '../components/MealInProgress';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const { setRecipeInProgress,
    setIngredientsChecked } = useContext(context);

  const { pathname } = window.location;
  const regex = /\d+/g;
  const id = pathname.match(regex);
  const drinksPage = pathname.includes('/drinks');
  const typeOfRecipe = pathname.includes('/drinks') ? 'drinks' : 'meals';

  useEffect(() => {
    const type = pathname.includes('/meals') ? 'themealdb' : 'thecocktaildb';
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage) setIngredientsChecked(storage);
    if (!storage) setIngredientsChecked([{ drinks: {}, meals: {} }]);

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
    } else if (target.checked && inProgressStorage[0][typeOfRecipe]) {
      if (inProgressStorage[0][typeOfRecipe][id]) {
        localStorage.setItem('inProgressRecipes', JSON.stringify([{ ...previousStorage[0],
          [typeOfRecipe]: { ...previousStorage[0][typeOfRecipe],
            [id]: [...previousStorage[0][typeOfRecipe][id], value],
          },
        }]));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify([{ ...previousStorage[0],
          [typeOfRecipe]: { ...previousStorage[0][typeOfRecipe],
            [id]: [value],
          },
        }]));
      }
    } else if (!target.checked && previousStorage[0][typeOfRecipe][id]
      .some((ingredient) => ingredient === value)) {
      const newIngredient = previousStorage[0][typeOfRecipe][id]
        .filter((ingredient) => ingredient !== value);
      localStorage.setItem('inProgressRecipes', JSON.stringify([{ ...previousStorage[0],
        [typeOfRecipe]: { ...previousStorage[0][typeOfRecipe],
          [id]: newIngredient,
        },
      }]));
    }
    setIngredientsChecked(JSON.parse(localStorage.getItem('inProgressRecipes')));
  };

  return (
    <div>
      {drinksPage
        ? <DrinkInProgress handleClassChange={ handleClassChange } />
        : <MealInProgress handleClassChange={ handleClassChange } /> }
      <Footer />
    </div>
  );
}

export default RecipeInProgress;
