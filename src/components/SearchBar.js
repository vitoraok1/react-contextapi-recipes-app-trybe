import React from 'react';

export default function SearchBar() {
  return (
    <section>
      <div>
        <label htmlFor="search-input">
          <input
            id="search-input"
            // value={}
            name="resultInput"
            type="text"
            placeholder="Search..."
            data-testid="search-input"
            // onChange={}
          />

        </label>
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            value="ingredient"
            name="nome"
            data-testid="ingredient-search-radio"
            // onClick={}
          />
          Ingredientes

        </label>
        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            value="name"
            name="nome"
            defaultChecked
            data-testid="name-search-radio"
            // onClick={}
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            id="first-letter"
            type="radio"
            value="first-letter"
            name="nome"
            data-testid="first-letter-search-radio"
            // onClick={}
          />
          Primeira Letra
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        // onClick={}
      >
        Pesquisar

      </button>
    </section>
  );
}
