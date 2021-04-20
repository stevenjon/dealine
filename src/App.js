import React, { useState } from 'react';
import './App.css';
import Home from './Components/Layout/Home';
import Lock from './Components/Lock/Lock';
import 'antd/dist/antd.css';
function App() {
  const [logIn, setLogIn] = useState(false);
  return (
    <div className="App">
      {logIn ? <Home setLogin={setLogIn}></Home > : <Lock setLogIn={setLogIn}></Lock>}
    </div>
  );
}

export default App;
