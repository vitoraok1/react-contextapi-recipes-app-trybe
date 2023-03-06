import React, { useContext, useState } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import {
  getFilterDrinksByIngredients,
  getFilterMealsByIngredients,
  getMealsDataByFirstLetter,
  getDrinksDataByFirstLetter,
  getMealsDataByName,
  getDrinksDataByName,
} from '../services/drinksAndMeals';
import context from '../context/Context';

export default function SearchBar() {
  const {
    setDrinksData,
    setMealsData,
    mealsData,
    drinksData } = useContext(context);

  const drinksPage = useRouteMatch('/drinks');
  const [filterRadio, setFilterRadio] = useState('name');
  const [inputValue, setInputValue] = useState('');
  const [isValidate, setIsValidate] = useState(true);

  const handleValidateFirstLetter = (selectedRadio, value) => {
    if (selectedRadio === 'first-letter' && value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      setIsValidate(false);
    }
  };

  const handleClickRequestAPI = () => {
    handleValidateFirstLetter(filterRadio, inputValue);

    switch (filterRadio) {
    case 'ingredients':
      if (drinksPage) {
        const filterDrinksByIngredients = getFilterDrinksByIngredients(inputValue);
        filterDrinksByIngredients.then((total) => {
          setDrinksData(total);
        });
      } else {
        const filterMealsByIngredient = getFilterMealsByIngredients(inputValue);
        filterMealsByIngredient.then((total) => {
          setMealsData(total);
        });
      }
      break;
    case 'name':
      if (drinksPage) {
        const filterDrinksByName = getDrinksDataByName(inputValue);
        filterDrinksByName.then((total) => {
          setDrinksData(total);
        });
      } else {
        const filterMealsByName = getMealsDataByName(inputValue);
        filterMealsByName.then((total) => {
          setMealsData(total);
        });
      }
      break;
    case 'first-letter':
      if (isValidate) {
        if (drinksPage) {
          const filterDrinksByFirstLetter = getDrinksDataByFirstLetter(inputValue);
          filterDrinksByFirstLetter.then((total) => {
            setDrinksData(total);
          });
        } else {
          const filterMealsByFirstLetter = getMealsDataByFirstLetter(inputValue);
          filterMealsByFirstLetter.then((total) => {
            setMealsData(total);
          });
        }
      }
      break;
    default:
      break;
    }
  };

  if (mealsData.length === 1) {
    return <Redirect to={ `meals/${mealsData[0].idMeal}` } />;
  } if (drinksData.length === 1) {
    return <Redirect to={ `drinks/${drinksData[0].idDrink}` } />;
  }

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
