// MapScreen.js
import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { useSearch } from '../contexts/searchContext';

const MapScreen = forwardRef((props, ref) => {
  const mapRef = useRef(null);
  const { coordinates } = useSearch();

  const [initialRegion, setInitialRegion] = useState({
    latitude: 47.2184,
    longitude: -1.5536,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [region, setRegion] = useState(initialRegion);

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      setRegion({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      mapRef.current?.animateToRegion(
        {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        2000
      );
    }
  }, [coordinates]);

  // Associer la référence ref au mapRef local
  React.useImperativeHandle(ref, () => ({
    animateToRegion: (region) => mapRef.current?.animateToRegion(region, 2000),
  }));

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={initialRegion} region={region} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
