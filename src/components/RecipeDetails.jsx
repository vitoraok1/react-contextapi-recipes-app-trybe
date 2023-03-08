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
          setDrinkDetails(total);
          console.log('fetchDrinkDetails');
        });
      }
      if (pathname.includes('/meals')) {
        const replaceMeals = pathname.replace('/meals/', '');
        const everyMeals = getRecipesById(type, replaceMeals);
        everyMeals.then((total) => {
          setMealsDetails(total);
          console.log('fetchMealDetails');
        });
      }
    };
    fetchRecipes();
  }, []);

  // useEffect(() => {
  //   const minNumberIngredient = 21;
  //   const maxNumberIngredient = 32;
  //   const minNumberMeasure = 32;
  //   const maxNumberMeasure = 48;
  //   const { pathname } = window.location;
  //   const replaceDrinks = pathname.replace('/drinks/', '');
  //   const everyDrinks = getRecipesById('thecocktaildb', replaceDrinks);
  //   everyDrinks.then((total) => {
  //     console.log(Object.entries(total[0]));
  //     setDrinkDetails(total[0]);
  //     setDrinkIngredients(Object.entries(total[0])
  //       .slice(minNumberIngredient, maxNumberIngredient)
  //       .filter((ingredient) => (ingredient[1])));
  //     setDrinkIngredientsMeasure(Object.entries(total[0])
  //       .slice(minNumberMeasure, maxNumberMeasure)
  //       .filter((measure) => (measure[1])));
  //   });
  // }, []);

  return (
    <div>
      {window.location.pathname
        .includes('/meals') ? <CardMealsDetails /> : <CardDrinksDetails />}
    </div>
  );
}
