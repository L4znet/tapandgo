import { useSingleBicycleStation } from '@/app/hooks/useSingleBicycleStation';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native-paper';

const DetailsScreen = () => {

    const params = useLocalSearchParams();

    const {stationNumber, contractName} = params;

    const { station, loading, error } = useSingleBicycleStation(
        Array.isArray(stationNumber) ? stationNumber[0] : stationNumber,
        Array.isArray(contractName) ? contractName[0] : contractName
    );
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