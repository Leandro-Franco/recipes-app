import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProviderFilter from './Contexts/ProviderFilter';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
import Profile from './Pages/Profile';
import Done from './Pages/Done';
import Favorites from './Pages/Favorites';
import RecipeDetails from './Components/RecipeDetails';

function App() {
  return (
    <BrowserRouter>
      <ProviderFilter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ Done } />
          <Route exact path="/favorite-recipes" component={ Favorites } />
        </Switch>
      </ProviderFilter>
    </BrowserRouter>
  );
}

export default App;
