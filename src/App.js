import { AppContextProvider } from './context/AppContext';
import React from 'react';
import Main from './components/Main';
import './App.css';

require('dotenv').config()

function App() {
  return (
    <AppContextProvider>
        <Main />
    </AppContextProvider>
  );
}

export default App;
