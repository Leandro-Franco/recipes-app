import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProviderData from './Contexts/ProviderData';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
import Profile from './Pages/Profile';
import Done from './Pages/Done';
import Favorites from './Pages/Favorites';
import RecipeDetails from './Components/RecipeDetails';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ProviderData>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/meals" component={ Meals } />
            <Route path="/drinks" component={ Drinks } />
            <Route path="/meals/:id" component={ RecipeDetails } />
            <Route path="/drinks/:id" component={ RecipeDetails } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ Done } />
            <Route exact path="/favorite-recipes" component={ Favorites } />
          </Switch>
        </ProviderData>
      </BrowserRouter>
    </div>
  );
}

export default App;
