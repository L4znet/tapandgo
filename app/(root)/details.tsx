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
            {station && (
                <>
                    <View style={styles.header}>
                        <Text style={styles.stationNumber}>n°{station.number}</Text>
                        <Text style={styles.stationName}>{station.name}</Text>
                        <Text style={styles.address}>{station.address}</Text>
                    </View>
                    <Text style={styles.title}>Vélos disponibles</Text>
                    <Text style={styles.availableBikes}>
                             {station.totalStands.availabilities.bikes}
                            /{station.totalStands.capacity} vélos disponibles
                    </Text>
                </>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        paddingVertical: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stationNumber: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
    },
    stationName: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '95%',
        paddingVertical: 10,
    },
    address: {
        fontSize: 16,
        color: 'black',
    },
    availableBikes: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    title: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
    },
});

export default DetailsScreen;