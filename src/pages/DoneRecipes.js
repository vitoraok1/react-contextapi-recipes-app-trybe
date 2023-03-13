import React, { useEffect, useContext, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const { isCopy, setIsCopy } = useContext(context);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneRecipesFilter, setDoneRecipesFilter] = useState([]);

  useEffect(() => {
    const doneRecipesData = JSON.parse(localStorage
      .getItem('doneRecipes'));
    if (doneRecipesData) {
      setDoneRecipes(doneRecipesData);
      setDoneRecipesFilter(doneRecipesData);
    }
  }, []);

  const doneDrinks = () => {
    const drinks = doneRecipes.filter((recipes) => recipes.type === 'drink');
    setDoneRecipesFilter(drinks);
    console.log('Drinks');
  };

  const doneMeals = () => {
    const meals = doneRecipes.filter((recipes) => recipes.type === 'meal');
    setDoneRecipesFilter(meals);
    console.log('Meals');
  };

  const doneAll = () => {
    setDoneRecipesFilter(doneRecipes);
    console.log('ALL');
  };

  const handleShare = () => {
    const { pathname } = window.location;
    const inProgress = pathname.replace('/in-progress', '');
    clipboardCopy(`http://localhost:3000${inProgress}`);
    setIsCopy(true);
  };
  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        onClick={ doneAll }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ doneMeals }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ doneDrinks }
      >
        Drinks
      </button>
      {doneRecipesFilter.map((recipes, index) => (
        <div key={ index }>
          <h3 data-testid={ `${index}-horizontal-name` }>
            Nome:
            {' '}
            {recipes.name}

          </h3>
          <img
            data-testid={ `${index}-horizontal-image` }
            alt="Imagem"
            src={ recipes.image }
          />
          <h4 data-testid={ `${index}-horizontal-top-text` }>
            {recipes.type === 'meal'
              ? `${recipes.nationality} - ${recipes.category}`
              : recipes.alcoholicOrNot }

          </h4>
          <h4 data-testid={ `${index}-horizontal-done-date` }>
            Concluída em:
            {' '}
            {recipes.doneDate}
          </h4>
          <tag data-testid={ `${index}-${recipes.tags}-horizontal-tag` }>
            {recipes.tags}
          </tag>

          <div>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ handleShare }
            >
              <img src={ shareIcon } alt="share icon" />
            </button>
            { isCopy ? <span>Link copied!</span> : null}
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default DoneRecipes;
