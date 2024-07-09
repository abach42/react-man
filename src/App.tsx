import React from 'react';
import logo from './logo.svg';
import './App.css';
import SuperheroList from './domain/superhero/SuperheroList';
import SuperheroProvider from './domain/superhero/SuperheroProvider';
import SuperheroLoader from './domain/superhero/SuperheroLoader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <SuperheroProvider>
          <SuperheroLoader id={null} />
          <SuperheroList />
        </SuperheroProvider>
      </main>
    </div>
  );
}

export default App;
