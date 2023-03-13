import React, { useEffect, useContext } from 'react';
import { getRecipesById, getRecipes } from '../services/drinksAndMeals';
import context from '../context/Context';
import CardMealsDetails from './CardMealsDetails';
import CardDrinksDetails from './CardDrinksDetails';
import './RecipeDetails.css';
import StartRecipeButton from './StartRecipeButton';

export default function RecipeDetails() {
  const { setDrinkDetails,
    setMealsDetails,
    setDrinksData,
    setMealsData,
    setSaveId, setIsDrinkFavorited, setIsMealFavorited } = useContext(context);
  const alreadyFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  useEffect(() => {
    const { pathname } = window.location;
    const regex = /\d+/g;
    const regexId = pathname.match(regex);
    const id = regexId.shift();
    const type = pathname.includes('/meals') ? 'themealdb' : 'thecocktaildb';
    if (alreadyFavorite.some((favorite) => favorite.id === id)) {
      if (pathname.includes('/drinks')) {
        setIsDrinkFavorited(true);
      }
      setIsMealFavorited(true);
    }
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
