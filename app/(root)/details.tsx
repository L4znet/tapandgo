import { useSingleBicycleStation } from '@/hooks/useSingleBicycleStation';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native-paper';

const DetailsScreen = () => {

    const params = useLocalSearchParams();

    const {stationNumber, contractName} = params;

    const { station, loading, error } = useSingleBicycleStation(stationNumber, contractName);


    return (
        <View>
            <Text style={styles.stationName}>{station?.name}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    stationName: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    }
});

export default DetailsScreen;