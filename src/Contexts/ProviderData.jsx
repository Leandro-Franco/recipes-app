import { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const context = createContext();

export default context;

export function Provider({ children }) {
  // const [user, setUser] = useState({});

  const [dataSearch, setDataSearch] = useState({
    textSearch: '',
    searchOptions: '',
  });

  const [resultsOfSearch, setResultsOfSearch] = useState([]);

  const data = useMemo(() => ({
    dataSearch,
    resultsOfSearch,
    setDataSearch,
    setResultsOfSearch,
  }), [dataSearch, resultsOfSearch]);

  return (
    <context.Provider
      value={ data }
    >
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
