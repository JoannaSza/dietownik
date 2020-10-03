import React from 'react';
import { Route } from 'react-router-dom';

import axios from '../apis/diets';
import styles from './App.module.css';

import Navbar from './Navbar';
import Diet from './pages/Diet/Diet';
import Recipes from './pages/Recipes';

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
      <Navbar />
      <div className='container text-center'>
        {/* <div className={styles.test}>TEST ME</div>
        <button onClick={onClickHandler}>Test database</button>
        <Route path='/' exact component={Diet} />
        <Route path='/posilki' component={Recipes} /> */}
        <h1 className='mt-5'>Dietownik dopiero powstaje</h1>
        <h4 className='text-secondary'>Czekaj na update!</h4>
      </div>
    </div>
  );
};

export default App;
