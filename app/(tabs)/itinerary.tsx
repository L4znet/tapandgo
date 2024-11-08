import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { TOMTOM_API_TOKEN } from '@env';
import { useNearestBicycleStations } from '@/app/hooks/useNearestBicycleStations';

const ItineraryScreen = () => {
    const [startStation, setStartStation] = useState('');
    const [endStation, setEndStation] = useState('');
    const [startSuggestions, setStartSuggestions] = useState<{ id: string; address: { freeformAddress: string }; position: { lat: number; lon: number } }[]>([]);
    const [endSuggestions, setEndSuggestions] = useState<{ id: string; address: { freeformAddress: string }; position: { lat: number; lon: number } }[]>([]);
    
    const [startStationCoord, setStartStationCoord] = useState<{ latitude: number | null, longitude: number | null }>({
        latitude: null,
        longitude: null
    });
    const [endStationCoord, setEndStationCoord] = useState<{ latitude: number | null, longitude: number | null }>({
        latitude: null,
        longitude: null
    });

    const [filteredStations, setFilteredStations] = useState<{ name: string; position: { latitude: number; longitude: number | null; } }[]>([]);

    const { nearestStation: nearestStartStation } = useNearestBicycleStations(startStationCoord.latitude, startStationCoord.longitude) as { nearestStation: { name: string } | null };
    const { nearestStation: nearestEndStation } = useNearestBicycleStations(endStationCoord.latitude, endStationCoord.longitude) as { nearestStation: { name: string } | null };

    useEffect(() => {
        if (nearestStartStation) {
            setStartStation(nearestStartStation.name);
        }
    }, [nearestStartStation]);

    useEffect(() => {
        if (nearestEndStation) {
            setEndStation(nearestEndStation.name);
        }
    }, [nearestEndStation]);
  

    const fetchSuggestions = async (query: React.SetStateAction<string>, setSuggestions: React.Dispatch<React.SetStateAction<{ id: string; address: { freeformAddress: string }; position: { lat: number; lon: number } }[]>>) => {
        if (!query) return;
        try {
            const response = await fetch(`https://api.tomtom.com/search/2/search/${query}.json?key=${TOMTOM_API_TOKEN}&typeahead=true&limit=5`);
            const data = await response.json();
            setSuggestions(data.results);
        } catch (error) {
            console.error('Erreur de récupération des suggestions :', error);
        }
    };

    const onStartStationChange = (startStation: React.SetStateAction<string>) => {
        setStartStation(startStation);
        fetchSuggestions(startStation, setStartSuggestions);
    };

    const onEndStationChange = (endStation: React.SetStateAction<string>) => {
        setEndStation(endStation);
        fetchSuggestions(endStation, setEndSuggestions);
    };

    const selectStartSuggestion = (place: { address: { freeformAddress: string }, position: { lat: number, lon: number } }) => {
        setStartStation(place.address.freeformAddress);
        setStartStationCoord({ latitude: place.position.lat, longitude: place.position.lon });
        setStartSuggestions([]);
    };

    const selectEndSuggestion = (place: { address: { freeformAddress: string }, position: { lat: number, lon: number } }) => {
        setEndStation(place.address.freeformAddress);
        setEndStationCoord({ latitude: place.position.lat, longitude: place.position.lon });
        setEndSuggestions([]);
    };

    const handleSearch = () => {
        if (startStationCoord.latitude && endStationCoord.latitude) {
            const startStation = {
                name: nearestStartStation ? nearestStartStation.name : '',
                position: {
                    latitude: startStationCoord.latitude,
                    longitude: startStationCoord.longitude
                }
            };

            const endStation = {
                name: nearestEndStation ? nearestEndStation.name : '',
                position: {
                    latitude: endStationCoord.latitude,
                    longitude: endStationCoord.longitude
                }
            };

            setFilteredStations([startStation, endStation]);
        } else {
            Alert.alert('Erreur', 'Veuillez sélectionner des stations valides.');
        }
    };

    return (
        <View style={styles.container}>
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

                    <Button mode="contained" style={styles.button} onPress={handleSearch}>
                        Rechercher
                    </Button>
                </View> 
            {filteredStations.length > 0 && (
                <View style={styles.results}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Station de départ</Text>
                        <Text style={styles.cardResult}> {filteredStations[0].name}</Text>
                     </View>
                     <View style={styles.card}>
                        <Text style={styles.cardTitle}>Station d'arrivée</Text>
                        <Text style={styles.cardResult}> {filteredStations[1].name}</Text>
                     </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    itineraryContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#1e1e1e',
        padding: 20,
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
    card: {
        width: 350,
        margin: 10,
        textAlign: 'center',
        backgroundColor: '#333',
        paddingHorizontal: 20,
        paddingVertical: 40,
        display: 'flex',
      },
    cardTitle: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cardResult: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 10,
    },
    results: {
        width: '100%',
        flex: 1,
    },
    button: {
        width: '70%',
        margin: 10,
    },
});

export default ItineraryScreen;
