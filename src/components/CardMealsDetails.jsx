import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import context from '../context/Context';

export default function CardDrinksDetails() {
  const { mealsDetails, drinksData } = useContext(context);

  let ingredients = [];
  let measure = [];
  Object.entries(mealsDetails).forEach((property) => {
    if (property[0].startsWith('strIngredient') && property[1]) {
      ingredients = [...ingredients, property[1]];
    }
    if (property[0].startsWith('strMeasure') && property[1]) {
      measure = [...measure, property[1]];
    }
  });

  console.log(drinksData);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt={ mealsDetails.strMeal }
        src={ mealsDetails.strMealThumb }
      />
      <title data-testid="recipe-title">{ mealsDetails.strMeal }</title>
      <span data-testid="recipe-category">{ mealsDetails.strCategory }</span>
      {ingredients.map((ingredient, index) => (
        <span
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient}
           ${measure[index] ? measure[index] : ''}`}
        </span>
      ))}
      <span data-testid="instructions">{ mealsDetails.strInstructions }</span>
      <ReactPlayer
        data-testid="video"
        url={ mealsDetails.strYoutube }
      />
    </div>
  );
}
