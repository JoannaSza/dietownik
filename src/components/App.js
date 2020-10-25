import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from '../apis/diets';
import styles from './App.module.css';

import Navbar from './Navbar';
import Diet from './pages/Diet/Diet';
import Recipes from './pages/Recipes';
import Login from './pages/Login/Login';

const App = (props) => {
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
      <Route path='/' exact component={props.isAuth ? Diet : Login} />
      <Route path='/posilki' component={Recipes} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isAuth: Boolean(state.auth.token) };
};

export default connect(mapStateToProps)(App);
