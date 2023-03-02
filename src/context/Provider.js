import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const context = {};

function Provider({ children }) {
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
