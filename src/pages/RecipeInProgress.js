import React, { useContext } from 'react';
import Footer from '../components/Footer';
import context from '../context/Context';

function RecipeInProgress() {
  const { drinkDetails, mealsDetails } = useContext(context);
  const { pathname } = window.location;
  const regex = /\d+/g;
  const id = pathname.match(regex);
  console.log(id);
  // const { params } = match;
  // const { id } = params;
  const drinksPage = pathname.includes('/drinks');
  const drinkProgressPage = () => {
    const drinkInfo = drinkDetails;
    console.log(drinkDetails);
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
    const mealInfo = mealsDetails;
    console.log(mealsDetails);

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
