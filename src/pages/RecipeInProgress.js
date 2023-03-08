import React, { useContext } from 'react';
import Footer from '../components/Footer';
import context from '../context/Context';

function RecipeInProgress() {
  const { pathname } = window.location;
  const regex = /\d+/g;
  const id = pathname.match(regex);
  const { drinksData, mealsData } = useContext(context);
  console.log(drinksData);
  console.log(mealsData);
  // const { params } = match;
  // const { id } = params;
  const drinksPage = pathname.includes('/drinks');
  const meals = mealsData.find((item) => item.idDrink === id);
  const drink = drinksData.find((item) => item.idDrink === id);

  const drinkProgressPage = () => {
    const drinkInfo = drink;

    return (
      <div>
        <div key={ drinkInfo.strCategory }>
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
          <h3 data-testid="recipe-category">{drinkInfo.strCategory}</h3>
          <h1 data-testid="recipe-title">{drinkInfo.strDrink}</h1>
          <img
            alt={ drinkInfo.strDrink }
            src={ drinkInfo.strMealThumb }
            data-testid="recipe-photo"
          />
          <p data-testid="instructions">{drinkInfo.strInstructions}</p>
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
  const mealProgressPage = () => {
    const mealInfo = meals;

    return (
      <div>
        <div key={ mealInfo.strCategory }>
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
          <h3 data-testid="recipe-category">{mealInfo.strCategory}</h3>
          <h1 data-testid="recipe-title">{mealInfo.strDrink}</h1>
          <img
            alt={ mealInfo.strDrink }
            src={ mealInfo.strMealThumb }
            data-testid="recipe-photo"
          />
          <p data-testid="instructions">{mealInfo.strInstructions}</p>
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
