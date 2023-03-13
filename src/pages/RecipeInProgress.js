import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecipesById, getRecipes } from '../services/drinksAndMeals';
import context from '../context/Context';
import Footer from '../components/Footer';
import DrinkInProgress from '../components/DrinkInProgress';
import MealInProgress from '../components/MealInProgress';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const { setRecipeInProgress,
    setIngredientsChecked,
    setMealsDetails,
    setDrinksData,
    setDrinkDetails,
    setSaveId,
    setMealsData, setIsDrinkFavorited, setIsMealFavorited } = useContext(context);
  const { pathname } = useLocation();
  const inProgress = pathname.replace('/in-progress', '');
  const regex = /\d+/g;
  const regexId = inProgress.match(regex);
  const id = regexId.shift();
  const drinksPage = inProgress.includes('/drinks');
  const typeOfRecipe = inProgress.includes('/drinks') ? 'drinks' : 'meals';
  const alreadyFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  useEffect(() => {
    const type = inProgress.includes('/meals') ? 'themealdb' : 'thecocktaildb';
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage) setIngredientsChecked(storage);
    if (!storage) setIngredientsChecked([{ drinks: {}, meals: {} }]);
    if (alreadyFavorite.some((favorite) => favorite.id === id)) {
      if (inProgress.includes('/drinks')) {
        setIsDrinkFavorited(true);
      }
      setIsMealFavorited(true);
    }
    const fetchRecipes = async () => {
      setRecipeInProgress(await getRecipesById(type, id));
    };
    const fetchRecipesDetails = async () => {
      if (inProgress.includes('/drinks')) {
        const replaceDrinks = inProgress.replace('/drinks/', '');
        setDrinkDetails(await getRecipesById(type, replaceDrinks));
        setMealsData(await getRecipes('themealdb'));
        setSaveId(replaceDrinks);
      }
      if (inProgress.includes('/meals')) {
        const replaceMeals = inProgress.replace('/meals/', '');
        setMealsDetails(await getRecipesById(type, replaceMeals));
        setDrinksData(await getRecipes('thecocktaildb'));
        setSaveId(replaceMeals);
      }
    };
    fetchRecipes();
    fetchRecipesDetails();
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
