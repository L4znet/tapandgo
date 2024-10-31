import { useAllBicycleStations } from '@/hooks/useAllBicycleStations';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';


const ItineraryScreen = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const { stations, loading, error } = useAllBicycleStations();
    const [filteredStations, setFilteredStations] = useState(stations);
    const [startStation, setStartStation] = useState('');
    const [endStation, setEndStation] = useState('');
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.itineraryContainer}>
                    <TextInput style={styles.itineraryInput} label="Station de départ" value={startStation}  onChangeText={startStation => setStartStation(startStation)}/>
                    <TextInput style={styles.itineraryInput} label="Station d'arrivée" value={endStation}  onChangeText={endStation => setEndStation(endStation)}/>
                    <Button mode="contained" onPress={() => console.log('Pressed')}>
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
    card:{
        width: '95%',
        margin: 10,
    },
    itineraryContainer:{
        display: 'flex',
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
})

export default ItineraryScreen;