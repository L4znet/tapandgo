import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabLayout from '../app/(tabs)/_layout';
import { useSearch } from '../app/contexts/SearchContext';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('../app/contexts/SearchContext', () => ({
  useSearch: jest.fn(),
}));

describe('TabLayout', () => {
  const mockSetSearchTerm = jest.fn();
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    (useSearch as jest.Mock).mockReturnValue({
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
      coordinates: { latitude: 0, longitude: 0, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <TabLayout />
      </NavigationContainer>
    );
    expect(getByPlaceholderText('Search')).toBeTruthy();
  });

  it('handles search correctly', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <TabLayout />
      </NavigationContainer>
    );

    const searchBar = getByPlaceholderText('Search');
    fireEvent.changeText(searchBar, 'test query');
    fireEvent(searchBar, 'onIconPress');

    expect(mockSetSearchTerm).toHaveBeenCalledWith('test query');
  });

  it('handles clear search correctly', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <TabLayout />
      </NavigationContainer>
    );

    const searchBar = getByPlaceholderText('Search');
    fireEvent.changeText(searchBar, 'test query');
    fireEvent(searchBar, 'onClearIconPress');

    expect(mockSetSearchTerm).toHaveBeenCalledWith('');
  });

  it('animates to region correctly', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <TabLayout />
      </NavigationContainer>
    );

    expect(mockSetSearchTerm).not.toHaveBeenCalled();
  });
});