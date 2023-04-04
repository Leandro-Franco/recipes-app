import PropTypes from 'prop-types';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './header.css';

function Header({ title }) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header>
      <section className="header-bar">
        <h3>RECIPIES app</h3>
        <div className="header-icons">
          {(title === 'Meals' || title === 'Drinks')
          && <input
            type="image"
            src={ searchIcon }
            alt="search"
            width="25px"
            onClick={ () => setShowSearchInput(!showSearchInput) }
            data-testid="search-top-btn"
          />}
          <img
            src={ profileIcon }
            alt="profile"
            width="25px"
            data-testid="profile-top-btn"
          />
        </div>
      </section>
      <section className="header-body">
        <h2 data-testid="page-title">{ title }</h2>
        { showSearchInput
          && <input
            type="text"
            className="text-input"
            placeholder="Search"
            // value={ search }
            // onChange={ ({ target: { value } }) => setSearch(value) }
          />}
      </section>
    </header>
  );
}

Header.propTypes = { title: PropTypes.string }.isRequired;

export default Header;
