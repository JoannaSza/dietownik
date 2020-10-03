import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            Navbar
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav'>
              <Link className='nav-link active' to='/'>
                Dieta <span className='sr-only'>(current)</span>
              </Link>
              <Link className='nav-link' to='/posilki'>
                Posiłki
              </Link>
              <Link className='nav-link' to='/'>
                Pricing
              </Link>
              <Link
                className='nav-link disabled'
                to='/'
                tabIndex='-1'
                aria-disabled='true'
              >
                Disabled
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
