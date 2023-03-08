import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { getRecipesById } from '../services/drinksAndMeals';

export default function CardDrinksDetails() {
  const [mealDetails, setMealDetails] = useState({});
  const [mealIngredients, setMealIngredients] = useState([]);
  const [mealIngredientsMeasure, setMealIngredientsMeasure] = useState([]);

  useEffect(() => {
    const minNumberIngredient = 9;
    const maxNumberIngredient = 29;
    const minNumberMeasure = 29;
    const maxNumberMeasure = 49;
    const { pathname } = window.location;
    const replaceMeals = pathname.replace('/meals/', '');
    const everyMeals = getRecipesById('themealdb', replaceMeals);
    everyMeals.then((total) => {
      setMealDetails(total[0]);
      console.log(Object.entries(total[0]));
      setMealIngredients(Object.entries(total[0])
        .slice(minNumberIngredient, maxNumberIngredient)
        .filter((ingredient) => (ingredient[1])));
      setMealIngredientsMeasure(Object.entries(total[0])
        .slice(minNumberMeasure, maxNumberMeasure)
        .filter((measure) => (measure[1])));
    });
  }, []);
  console.log(mealIngredients);
  console.log(mealIngredientsMeasure);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt={ mealDetails.strMeal }
        src={ mealDetails.strMealThumb }
      />
      <title data-testid="recipe-title">{ mealDetails.strMeal }</title>
      <span data-testid="recipe-category">{ mealDetails.strCategory }</span>
      {mealIngredients.map((ingredient, index) => (
        <span
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient[1]}
           ${mealIngredientsMeasure[index] ? mealIngredientsMeasure[index][1] : ''}`}
        </span>
      ))}
      <span data-testid="instructions">{ mealDetails.strInstructions }</span>
      <ReactPlayer
        data-testid="video"
        url={ mealDetails.strYoutube }
      />
    </div>
  );
}
