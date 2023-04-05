import { useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { } from '../Services/ApiRequest';
import ContextFilter from './ContextData';

function ProviderFilter({ children }) {
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {

  }, [categoryFilter]);

  const values = useMemo(() => ({
    categoryFilter,
    setCategoryFilter,
  }), [categoryFilter, setCategoryFilter]);

  return (
    <ContextFilter.Provider value={ values }>
      { children }
    </ContextFilter.Provider>
  );
}

export const useFilter = () => useContext(ContextFilter);

ProviderFilter.propTypes = { children: PropTypes.node }.isRequired;

export default ProviderFilter;
