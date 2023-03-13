import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import { Carousel } from 'react-responsive-carousel';
import context from '../context/Context';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import FavoriteButtonMeal from './FavoriteButtonMeal';
import ShareButton from './ShareButton';

export default function CardMealsDetails() {
  const { mealsDetails, drinksData } = useContext(context);
  const { drinks } = drinksData;
  const maxCards = 6;
  let ingredients = [];
  let measure = [];
console.log(mealsDetails);
  Object.entries(mealsDetails).forEach((property) => {
    if (property[0].startsWith('strIngredient') && property[1]) {
      ingredients = [...ingredients, property[1]];
    }
    if (property[0].startsWith('strMeasure') && property[1]) {
      measure = [...measure, property[1]];
    }
  });

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt={ mealsDetails.strMeal }
        src={ mealsDetails.strMealThumb }
      />
      <h1 data-testid="recipe-title">{ mealsDetails.strMeal }</h1>
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
      <br />
      <FavoriteButtonMeal />
      {' '}
      <ShareButton />
      <ReactPlayer
        data-testid="video"
        url={ mealsDetails.strYoutube }
      />
      <Carousel>
        {drinks?.slice(0, maxCards).map(
          ({ strDrink, strDrinkThumb }, index) => (
            <div key={ index } data-testid={ `${index}-recommendation-card` }>

              <img
                alt={ strDrink }
                src={ strDrinkThumb }
              />

              <h2 key={ strDrink } data-testid={ `${index}-recommendation-title` }>
                { strDrink }
              </h2>
            </div>
          ),
        )}
      </Carousel>
    </div>
  );
}
