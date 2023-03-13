import React, { useContext, useEffect } from 'react';
import { useRouteMatch, useLocation, Link } from 'react-router-dom';
import context from '../context/Context';
import CategoryButton from './CategoryButton';
import { getRecipes, getRecipesByCategory } from '../services/drinksAndMeals';

export default function Recipes() {
  const { drinksData,
    mealsData,
    setDrinksCategory,
    setMealsCategory,
    setDrinksData,
    setMealsData,
  } = useContext(context);
  const maxCards = 12;
  const drinksPage = useRouteMatch('/drinks');
  const { pathname } = useLocation();

  useEffect(() => {
    const type = pathname.includes('/meals') ? 'themealdb' : 'thecocktaildb';
    const fetchRecipes = async () => {
      if (pathname.includes('/meals')) {
        setMealsData(await getRecipes(type));
        setMealsCategory(await getRecipesByCategory(type));
      }
      if (pathname.includes('/drinks')) {
        setDrinksData(await getRecipes(type));
        setMealsData(await getRecipes(type));
        setDrinksCategory(await getRecipesByCategory(type));
      }
    };
    fetchRecipes();
  }, []);

  const drinksCard = () => {
    const drinksRecipes = drinksData.drinks;

    return (
      <div>
        {drinksRecipes && drinksRecipes?.slice(0, maxCards).map(
          ({ strDrink, strDrinkThumb, idDrink }, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <Link to={ `/drinks/${idDrink}` }>
                <img
                  alt={ strDrink }
                  src={ strDrinkThumb }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
              <h2 key={ strDrink } data-testid={ `${index}-card-name` }>{ strDrink }</h2>
            </div>
          ),
        )}
      </div>
    );
  };

  const mealsCard = () => {
    const mealsRecipes = mealsData.meals;

    return (
      <div>
        {mealsRecipes && mealsRecipes?.slice(0, maxCards).map(
          ({ strMeal, strMealThumb, idMeal }, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <Link to={ `/meals/${idMeal}` }>
                <img
                  alt={ strMeal }
                  src={ strMealThumb }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
              <h2 key={ strMeal } data-testid={ `${index}-card-name` }>{ strMeal }</h2>
            </div>

          ),
        )}
      </div>
    );
  };

  return (
    <div>
      <CategoryButton />
      {drinksPage ? drinksCard() : mealsCard() }
    </div>
  );
}
