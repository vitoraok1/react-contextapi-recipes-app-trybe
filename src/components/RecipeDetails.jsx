import React, { useEffect, useContext } from 'react';
import { getRecipesById, getRecipes } from '../services/drinksAndMeals';
import context from '../context/Context';
import CardMealsDetails from './CardMealsDetails';
import CardDrinksDetails from './CardDrinksDetails';
import StartRecipeButton from './StartRecipeButton';
import './RecipeDetails.css';

export default function RecipeDetails() {
  const { setDrinkDetails,
    setMealsDetails,
    setDrinksData,
    setMealsData,
    setSaveId } = useContext(context);

  useEffect(() => {
    const { pathname } = window.location;
    const type = pathname.includes('/meals') ? 'themealdb' : 'thecocktaildb';
    const fetchRecipes = async () => {
      if (pathname.includes('/drinks')) {
        const replaceDrinks = pathname.replace('/drinks/', '');
        setDrinkDetails(await getRecipesById(type, replaceDrinks));
        setMealsData(await getRecipes('themealdb'));
        setSaveId(replaceDrinks);
      }
      if (pathname.includes('/meals')) {
        const replaceMeals = pathname.replace('/meals/', '');
        setMealsDetails(await getRecipesById(type, replaceMeals));
        setDrinksData(await getRecipes('thecocktaildb'));
        setSaveId(replaceMeals);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      {window.location.pathname
        .includes('/meals') ? (
          <div>
            <CardMealsDetails />
          </div>
        ) : (
          <div>
            <CardDrinksDetails />
          </div>
        )}
      <StartRecipeButton />
    </div>
  );
}
