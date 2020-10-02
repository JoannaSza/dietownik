import React from 'react';
import Navbar from './Navbar';

import axios from '../apis/diets';
import styles from './App.module.css';

const App = () => {
  const onClickHandler = async () => {
    const response = await axios.get('/produkty.json');
    console.log(response);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.test}>TEST ME</div>
      <button onClick={onClickHandler}>Test database</button>
    </div>
  );
};

export default App;
