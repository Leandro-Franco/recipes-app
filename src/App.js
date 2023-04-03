import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderData from './Contexts/ProviderData';
import Login from './Pages/Login';

function App() {
  return (
    <div className="app">
      <ProviderData>
        <Login />
      </ProviderData>
    </div>
  );
}

export default App;
