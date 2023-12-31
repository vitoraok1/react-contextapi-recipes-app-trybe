import React, { useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import context from '../context/Context';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import FavoriteButtonDrink from './FavoriteButtonDrink';
import ShareButton from './ShareButton';

export default function CardDrinksDetails() {
  const { drinkDetails, mealsData } = useContext(context);
  const { meals } = mealsData;
  const maxCards = 6;
  let ingredients = [];
  let measure = [];

  Object.entries(drinkDetails).forEach((property) => {
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
        alt={ drinkDetails.strDrink }
        src={ drinkDetails.strDrinkThumb }
      />
      <h1 data-testid="recipe-title">{ drinkDetails.strDrink }</h1>
      <span data-testid="recipe-category">{ drinkDetails.strAlcoholic }</span>
      {ingredients.map((ingredient, index) => (
        <span
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient} -
         ${measure[index] ? measure[index] : ''}`}
        </span>
      ))}
      <span data-testid="instructions">{ drinkDetails.strInstructions }</span>
      <br />
      <FavoriteButtonDrink />
      {' '}
      <ShareButton />
      <Carousel>
        {meals?.slice(0, maxCards).map(
          ({ strMeal, strMealThumb }, index) => (
            <div key={ index } data-testid={ `${index}-recommendation-card` }>

              <img
                alt={ strMeal }
                src={ strMealThumb }

              />

              <h2 key={ strMeal } data-testid={ `${index}-recommendation-title` }>
                { strMeal }
              </h2>
            </div>
          ),
        )}
      </Carousel>
    </div>
  );
}
