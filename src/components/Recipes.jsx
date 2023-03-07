import React, { useContext } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import context from '../context/Context';
import CategoryButton from './CategoryButton';

export default function Recipes() {
  const { drinksData, mealsData } = useContext(context);
  const maxCards = 12;
  const drinksPage = useRouteMatch('/drinks');

  const drinksCard = () => {
    const drinksRecipes = drinksData.drinks;

    return (
      <div>
        {drinksRecipes?.slice(0, maxCards).map(
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
        {mealsRecipes?.slice(0, maxCards).map(
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
