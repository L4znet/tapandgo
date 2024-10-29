import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext({
  searchTerm: '',
  setSearchTerm: () => {},
  coordinates: {
    latitude: null,
    longitude: null,
  },
  setCoordinates: () => {},
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, coordinates, setCoordinates }}>
      {children}
    </SearchContext.Provider>
  );
};