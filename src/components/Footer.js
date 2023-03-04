import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <button onClick={ () => history.push('/drinks') }>
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drink Icon" />
      </button>

      <button onClick={ () => history.push('/meals') }>
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="Meal Icon" />
      </button>
    </footer>
  );
}
