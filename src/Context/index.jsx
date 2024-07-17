
import React, { createContext, useContext, useState } from 'react';

// Create a context
const StateContext = createContext();

// Create a provider component
export const StateProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);

  return (
    <StateContext.Provider value={{ weather, setWeather }}>
      {children}
    </StateContext.Provider>
  );
};

// Create a hook to use the context
export const useStateContext = () => useContext(StateContext);
