import React from 'react';
import { Route } from 'react-router-dom';

import axios from '../apis/diets';
import styles from './App.module.css';

import Navbar from './Navbar';
import Diet from './pages/Diet/Diet';
import Recipes from './pages/Recipes';
import Login from './pages/Login/Login';

const App = () => {
  const onClickHandler = async () => {
    const response = await axios.get('/przepisy/obiady.json', {
      params: {
        orderBy: '"produkty/marchew"',
      },
    });
    console.log(response);
  };

  return (
    <div>
      {/* <Navbar /> */}
      {/* <button onClick={onClickHandler}>Test database</button> */}
      <Route path='/' exact component={Diet} />
      <Route path='/posilki' component={Recipes} />
      <Route path='/login' component={Login} />
    </div>
  );
};

export default App;
