import React from 'react';
import Login from './pages/Login';
import Provider from './context/Provider';
import './App.css';

function App() {
  return (
    <Provider>
      <Login />
    </Provider>
  );
}

export default App;
