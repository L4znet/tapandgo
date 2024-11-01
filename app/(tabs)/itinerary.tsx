import { useAllBicycleStations } from '@/hooks/useAllBicycleStations';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { TOMTOM_API_TOKEN } from '@env';
import { useNearestBicycleStation } from '@/hooks/useNearestBicycleStations';

const ItineraryScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { stations, loading, error } = useAllBicycleStations();
    const [filteredStations, setFilteredStations] = useState(stations);
    const [startStation, setStartStation] = useState('');
    const [endStation, setEndStation] = useState('');
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);
    const [startStationCoord, setStartStationCoord] = useState({
        latitude: null,
        longitude: null
    });

    const [endStationCoord, setEndStationCoord] = useState({
        latitude: null,
        longitude: null
    });

    const { nearestStation: nearestStartStation } = useNearestBicycleStation(startStationCoord.latitude, startStationCoord.longitude);
    const { nearestStation: nearestEndStation } = useNearestBicycleStation(endStationCoord.latitude, endStationCoord.longitude);


    const fetchSuggestions = async (query, setSuggestions) => {
        if (!query) return;
        try {
            const response = await fetch(`https://api.tomtom.com/search/2/search/${query}.json?key=${TOMTOM_API_TOKEN}&typeahead=true&limit=5`);
            const data = await response.json();
            setSuggestions(data.results);
        } catch (error) {
            console.error('Erreur de récupération des suggestions :', error);
        }
    };

    const onStartStationChange = (text) => {
        setStartStation(text);
        fetchSuggestions(text, setStartSuggestions);
    };

    const onEndStationChange = (text) => {
        setEndStation(text);
        fetchSuggestions(text, setEndSuggestions);
    };

    const selectStartSuggestion = (place) => {
        setStartStation(place.address.freeformAddress);
        setStartSuggestions([]);

    };

    const selectEndSuggestion = (place) => {
        setEndStation(place.address.freeformAddress);
        setEndSuggestions([]);
    };

    const handleSearch = (startLatitude, startLongitude, endLatitude, endLongitude) => {
        setStartStationCoord({ latitude: startLatitude, longitude: startLongitude });
        setEndStationCoord({ latitude: endLatitude, longitude: endLongitude });
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.itineraryContainer}>
                    <TextInput
                        style={styles.itineraryInput}
                        label="Station de départ"
                        value={startStation}
                        onChangeText={onStartStationChange}
                    />
                    {startSuggestions.length > 0 && (
                        <FlatList
                            data={startSuggestions}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => selectStartSuggestion(item)}>
                                    <Text style={styles.suggestionItem}>{item.address.freeformAddress}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}

                    <TextInput
                        style={styles.itineraryInput}
                        label="Station d'arrivée"
                        value={endStation}
                        onChangeText={onEndStationChange}
                    />
                    {endSuggestions.length > 0 && (
                        <FlatList
                            data={endSuggestions}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => selectEndSuggestion(item)}>
                                    <Text style={styles.suggestionItem}>{item.address.freeformAddress}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}

                    <Button mode="contained" onPress={() => handleSearch(startStation.position.latitude, startStation.position.longitude, endStation.position.latitude, endStation.position.longitude)}>
                        Rechercher
                    </Button>
                </View> 
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    scrollViewContainer: {
        width: '100%',
    },
    itineraryContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 230,
        backgroundColor: '#1e1e1e',
    },
    itineraryInput: {
        margin: 10,
        width: '95%',
        color: 'white'
    },
    suggestionItem: {
        padding: 10,
        backgroundColor: '#333',
        color: 'white',
        width: '95%',
        marginVertical: 2,
        borderRadius: 5
    },
});

export default ItineraryScreen;
