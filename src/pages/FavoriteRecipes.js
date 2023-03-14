import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const { isCopy, setIsCopy } = useContext(context);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteRecipesFilter, setFavoriteRecipesFilter] = useState([]);

  useEffect(() => {
    const favoriteRecipesData = JSON.parse(localStorage
      .getItem('favoriteRecipes'));
    if (favoriteRecipesData) {
      setFavoriteRecipes(favoriteRecipesData);
      setFavoriteRecipesFilter(favoriteRecipesData);
    }
  }, []);

  const doneDrinks = () => {
    const drinks = favoriteRecipes.filter((recipes) => recipes.type === 'drink');
    setFavoriteRecipesFilter(drinks);
  };

  const doneMeals = () => {
    const meals = favoriteRecipes.filter((recipes) => recipes.type === 'meal');
    setFavoriteRecipesFilter(meals);
  };

  const doneAll = () => {
    setFavoriteRecipesFilter(favoriteRecipes);
  };

  const handleShare = () => {
    clipboardCopy(`http://localhost:3000/${recipes.type}s/${recipes.id}`);
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
        data-testid="filter-by-drink-btn"
        onClick={ doneDrinks }
      >
        Drinks
      </button>
      {favoriteRecipesFilter?.map((recipes, index) => (
        <div key={ index }>
          <h3 data-testid={ `${index}-horizontal-name` }>
            {recipes.name}
          </h3>
          <Link to={ `/${recipes.type}s/${recipes.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              alt="Imagem"
              src={ recipes.image }
            />
          </Link>
          <h4 data-testid={ `${index}-horizontal-top-text` }>
            {recipes.type === 'meal'
              ? `${recipes.nationality} - ${recipes.category}`
              : recipes.alcoholicOrNot }

          </h4>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ handleShare }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          { isCopy ? <span>Link copied!</span> : null}
          <h4 data-testid={ `${index}-horizontal-done-date` }>
            Concluída em:
            {' '}
            {recipes.doneDate}
          </h4>
          {recipes.tags?.map((tag, index2) => (
            <p key={ index2 } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </p>))}
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
