import React, { useContext, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  getFilterByIngredients,
  getRecipesByFirstLetter,
  getRecipesByName,
} from '../services/drinksAndMeals';
import context from '../context/Context';

export default function SearchBar() {
  const {
    setDrinksData,
    setMealsData } = useContext(context);

  const drinksPage = useRouteMatch('/drinks');
  const [filterRadio, setFilterRadio] = useState('name');
  const [inputValue, setInputValue] = useState('');
  const [isValidate, setIsValidate] = useState(true);

  const drinkUrl = 'thecocktaildb';
  const mealUrl = 'themealdb';

  const history = useHistory();

  const handleValidateFirstLetter = (selectedRadio, value) => {
    if (selectedRadio === 'first-letter' && value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      setIsValidate(false);
    }
  };

  const verifyDrinkToRedirect = (total) => {
    if (total.drinks && total.drinks.length === 1) {
      history.push(`/drinks/${total.drinks[0].idDrink}`);
    }
  };

  const verifyMealToRedirect = (total) => {
    if (total.meals && total.meals.length === 1) {
      history.push(`/meals/${total.meals[0].idMeal}`);
    }
  };

  const handleClickRequestAPI = () => {
    handleValidateFirstLetter(filterRadio, inputValue);
    if (filterRadio === 'ingredients') {
      if (drinksPage) {
        const filterDrinksByIngredients = getFilterByIngredients(drinkUrl, inputValue);
        filterDrinksByIngredients.then((total) => {
          verifyDrinkToRedirect(total);
          setDrinksData(total);
        });
      } else {
        const filterMealsByIngredient = getFilterByIngredients(mealUrl, inputValue);
        filterMealsByIngredient.then((total) => {
          verifyMealToRedirect(total);
          setMealsData(total);
        });
      }
    } else if (filterRadio === 'name') {
      if (drinksPage) {
        const filterDrinksByName = getRecipesByName(drinkUrl, inputValue);
        filterDrinksByName.then((total) => {
          verifyDrinkToRedirect(total);
          setDrinksData(total);
        });
      } else {
        const filterMealsByName = getRecipesByName(mealUrl, inputValue);
        filterMealsByName.then((total) => {
          verifyMealToRedirect(total);
          setMealsData(total);
        });
      }
    } else if (isValidate) {
      if (drinksPage) {
        const filterDrinksByFirstLetter = getRecipesByFirstLetter(drinkUrl, inputValue);
        filterDrinksByFirstLetter.then((total) => {
          setDrinksData(total);
        });
      } else {
        const filterMealsByFirstLetter = getRecipesByFirstLetter(mealUrl, inputValue);
        filterMealsByFirstLetter.then((total) => {
          setMealsData(total);
        });
      }
    }
  };

  return (
    <section>
      <div>
        <label htmlFor="search-input">
          <input
            id="search-input"
            name="resultInput"
            type="text"
            placeholder="Search..."
            data-testid="search-input"
            onChange={ (e) => setInputValue(e.target.value) }
          />

        </label>
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            value="ingredients"
            name="filters"
            data-testid="ingredient-search-radio"
            onClick={ (e) => setFilterRadio(e.target.value) }
          />
          Ingredientes

        </label>
        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            value="name"
            name="filters"
            defaultChecked
            data-testid="name-search-radio"
            onClick={ (e) => setFilterRadio(e.target.value) }
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            id="first-letter"
            type="radio"
            value="first-letter"
            name="filters"
            data-testid="first-letter-search-radio"
            onClick={ (e) => setFilterRadio(e.target.value) }
          />
          Primeira Letra
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        onClick={ handleClickRequestAPI }
      >
        Pesquisar

      </button>
    </section>
  );
}
