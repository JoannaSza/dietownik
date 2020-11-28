import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

import axios from '../apis/diets';
import styles from './App.module.css';

import Navbar from './UI/Navbar/Navbar';
import Diet from './pages/Diet/Diet';
import Recipes from './pages/Recipes/Recipes';
import Login from './pages/Login/Login';

class App extends React.Component {
  state = { activePageIndex: 0 };

  pageChangeHandler = (index) => this.setState({ activePageIndex: index });

  componentDidMount = () => {
    this.props.initGoogleAuth();
    this.props.handleResize();
    window.addEventListener('resize', this.props.handleResize);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.handleResize);
  }

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
        <Navbar
          activeIdx={this.state.activePageIndex}
          onPageChange={this.pageChangeHandler}
        />
        {/* <button onClick={onClickHandler}>Test database</button> */}
        <Route path='/' exact component={this.props.isAuth ? Diet : Login} />
        {/* comment login window for tests */}
        {/* <Route path='/' exact component={Diet} /> */}
        <Route path='/posilki/:category' component={Recipes} />
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
    handleResize: () => dispatch(actions.handleResize()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
