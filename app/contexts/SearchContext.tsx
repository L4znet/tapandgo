import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
  setCoordinates: (coordinates: { latitude: number | null; longitude: number | null; latitudeDelta?: number; longitudeDelta?: number }) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [coordinates, setCoordinates] = useState<{ latitude: number | null; longitude: number | null; latitudeDelta?: number; longitudeDelta?: number }>({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, coordinates, setCoordinates }}>
      {children}
    </SearchContext.Provider>
  );
};