import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

class Navbar extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <div className='container'>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Link className='navbar-brand' to='/'>
            Navbar
          </Link>
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
