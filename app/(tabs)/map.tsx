import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { useSearchBicycleStations } from '../../hooks/useSearchBicycleStations';

const MapScreen = React.forwardRef((props, ref) => {
    const { filteredStations, loading, error } = useSearchBicycleStations();
    const [longitudeDelta, setLongitudeDelta] = useState(0.0421);

    if (loading) return <View><Text>Loading...</Text></View>;
    if (error) return <View><Text>Error: {error.message}</Text></View>;

    const handleRegionChangeComplete = useCallback((region) => {
        setLongitudeDelta(region.longitudeDelta);
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                ref={ref}
                style={styles.map}
                onRegionChangeComplete={handleRegionChangeComplete}
            >
                {filteredStations.map(station => (
                    <MapView.Marker
                        key={station.number}
                        coordinate={{
                            latitude: station.position.latitude,
                            longitude: station.position.longitude,
                        }}
                        title={station.name}
                    />
                ))}
            </MapView>
            <View style={styles.zoomLevel}>
                <Text>Longitude Delta: {longitudeDelta}</Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
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

export default MapScreen;