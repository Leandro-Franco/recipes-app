import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ContextData from './ContextData';

function ProviderData({ children }) {
  // const [user, setUser] = useState({});

  const values = useMemo(() => ({}), []);

  return (
    <ContextData.Provider value={ values }>
      { children }
    </ContextData.Provider>
  );
}

export const useData = () => useContext(ContextData);

ProviderData.propTypes = { children: PropTypes.node }.isRequired;

export default ProviderData;
