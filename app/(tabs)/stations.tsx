import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar, Card, Text } from 'react-native-paper';
import MapView, { Marker, Region } from 'react-native-maps';
import { useSearch } from '../contexts/SearchContext';
import { useSearchBicycleStations } from '../../hooks/useSearchBicycleStations';

interface Station {
  number: number;
  name: string;
  position: {
    latitude: number;
    longitude: number;
  };
}

const StationsScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { searchTerm, setSearchTerm, coordinates } = useSearch();
  const { filteredStations, loading, error } = useSearchBicycleStations();
  const [longitudeDelta, setLongitudeDelta] = useState<number>(0.0421);

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      const targetRegion: Region = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: coordinates.latitudeDelta || 0.0922,
        longitudeDelta: coordinates.longitudeDelta || 0.0421,
      };
      mapRef.current?.animateToRegion(targetRegion, 2000);
    }
  }, [coordinates]);

  const handleRegionChangeComplete = useCallback((region: Region) => {
    setLongitudeDelta(region.longitudeDelta);
  }, []);

  const handleSearch = useCallback(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery, setSearchTerm]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchTerm('');
  }, [setSearchTerm]);

  const renderItem = ({ item }: { item: Station }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text>{item.name}</Text>
      </Card.Content>
    </Card>
  );

  if (loading) return <View><Text>Loading...</Text></View>;
  if (error) return <View><Text>Error: {error.message}</Text></View>;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {filteredStations.map((station: Station, index: number) => (
          <Marker
            key={index}
            coordinate={{
              latitude: station.position.latitude,
              longitude: station.position.longitude,
            }}
            title={station.name}
          />
        ))}
      </MapView>
      <FlatList
        data={filteredStations}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
      />
      <View style={styles.zoomLevel}>
        <Text>Longitude Delta: {longitudeDelta}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 80,
    backgroundColor: '#1e1e1e',
  },
  searchBar: {
    margin: 20,
    width: '95%',
    color: 'white',
  },
  map: {
    height: 300,
  },
  card: {
    width: '95%',
    margin: 10,
  },
  zoomLevel: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
});

export default StationsScreen;