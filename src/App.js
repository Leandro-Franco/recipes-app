import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProviderData from './Contexts/ProviderData';
import Login from './Pages/Login';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ProviderData>
          <Switch>
            <Route exact path="/" component={ Login } />
          </Switch>
        </ProviderData>
      </BrowserRouter>
    </div>
  );
}

export default App;
