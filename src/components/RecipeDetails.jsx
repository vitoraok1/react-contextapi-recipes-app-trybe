import React, { useEffect, useContext } from 'react';
import { getRecipesById, getRecipes } from '../services/drinksAndMeals';
import context from '../context/Context';
import CardMealsDetails from './CardMealsDetails';
import CardDrinksDetails from './CardDrinksDetails';
import './RecipeDetails.css';

export default function RecipeDetails() {
  const { setDrinkDetails,
    setMealsDetails,
    setDrinksData,
    setMealsData } = useContext(context);

  useEffect(() => {
    const { pathname } = window.location;
    const type = pathname.includes('/meals') ? 'themealdb' : 'thecocktaildb';
    const fetchRecipes = async () => {
      if (pathname.includes('/drinks')) {
        const replaceDrinks = pathname.replace('/drinks/', '');
        setDrinkDetails(await getRecipesById(type, replaceDrinks));
        setMealsData(await getRecipes('themealdb'));
      }
      if (pathname.includes('/meals')) {
        const replaceMeals = pathname.replace('/meals/', '');
        setMealsDetails(await getRecipesById(type, replaceMeals));
        setDrinksData(await getRecipes('thecocktaildb'));
      }
    };
    fetchRecipes();
  }, []);
  return (
    <div>
      {window.location.pathname
        .includes('/meals') ? <CardMealsDetails /> : <CardDrinksDetails />}
      <div className="div-start-recipe-btn">
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}
