import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

import axios from '../apis/diets';
import styles from './App.module.css';

import Navbar from './Navbar';
import Diet from './pages/Diet/Diet';
import Recipes from './pages/Recipes';
import Login from './pages/Login/Login';

class App extends React.Component {
  componentDidMount = () => {
    this.props.initGoogleAuth();
  };

  onClickHandler = async () => {
    const response = await axios.get('/przepisy/obiady.json', {
      params: {
        orderBy: '"produkty/marchew"',
      },
    });
    console.log(response);
  };

  render() {
    return (
      <div className='p-0 d-flex flex-column vh-100'>
        <Navbar />
        {/* <button onClick={onClickHandler}>Test database</button> */}
        {/* <Route path='/' exact component={this.props.isAuth ? Diet : Login} /> */}
        {/* comment login window for tests */}
        <Route path='/' exact component={Diet} />
        <Route path='/posilki' component={Recipes} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isAuth: Boolean(state.auth.token) };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initGoogleAuth: () => dispatch(actions.authInitStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
