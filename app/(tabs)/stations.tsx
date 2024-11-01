import React, { useRef, useState, useEffect, useCallback, forwardRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { useSearch } from '../contexts/SearchContext';
import { useSearchBicycleStations } from '../hooks/useSearchBicycleStations';
import { router, useNavigation } from 'expo-router';
import { BicycleStation } from '@/types/BicycleStation';

const StationsScreen = forwardRef<MapView>((props, ref) => {
  const mapRef = useRef<MapView>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { searchTerm, setSearchTerm, coordinates } = useSearch();
  const { filteredStations, loading, error } = useSearchBicycleStations();
  const [longitudeDelta, setLongitudeDelta] = useState(null);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 47.2184,
    longitude: -1.5536, 
    latitudeDelta: 0.10,
    longitudeDelta: 0.10,
  });

  const navigation = useNavigation();

  const handleSearch = useCallback(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery, setSearchTerm]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchTerm('');
  }, [setSearchTerm]);

  const goToAPoint = (station: { position: { latitude: number; longitude: number; }; }) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: station.position.latitude,
        longitude: station.position.longitude,
        latitudeDelta: 0.0001,
        longitudeDelta: 0.0001,
      });
    }
  }

  const goToDetail = (station: BicycleStation) => {
    router.push({
      pathname: '/details',
      params: {
        stationNumber: station.number,
        contractName: station.contractName,
      },
    });
  }

  const renderItem = ({ item }: { item: BicycleStation }) => (
    <Card style={styles.card} onPress={() => goToAPoint(item)} onLongPress={() => goToDetail(item)}>
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
        initialRegion={initialRegion}
      >
        {filteredStations.map((station, index) => (
          <Marker
            onPress={() => goToDetail(station)}
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
        initialNumToRender={7}
        data={filteredStations}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
});

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