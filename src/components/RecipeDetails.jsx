import React, { useEffect, useContext } from 'react';
import { getRecipesById } from '../services/drinksAndMeals';
import context from '../context/Context';
import CardMealsDetails from './CardMealsDetails';
import CardDrinksDetails from './CardDrinksDetails';

export default function RecipeDetails() {
  const { setDrinkDetails, setMealsDetails } = useContext(context);

  useEffect(() => {
    const { pathname } = window.location;
    const type = pathname.includes('/meals') ? 'themealdb' : 'thecocktaildb';
    const fetchRecipes = () => {
      if (pathname.includes('/drinks')) {
        const replaceDrinks = pathname.replace('/drinks/', '');
        const everyDrinks = getRecipesById(type, replaceDrinks);
        everyDrinks.then((total) => {
          setDrinkDetails(total[0]);
        });
      }
      if (pathname.includes('/meals')) {
        const replaceMeals = pathname.replace('/meals/', '');
        const everyMeals = getRecipesById(type, replaceMeals);
        everyMeals.then((total) => {
          setMealsDetails(total[0]);
        });
      }
    };
    fetchRecipes();
  }, []);
  return (
    <div>
      {window.location.pathname
        .includes('/meals') ? <CardMealsDetails /> : <CardDrinksDetails />}
    </div>
  );
}
