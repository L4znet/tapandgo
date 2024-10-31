import React, { useRef, useState } from 'react';
import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { BicycleStation } from '@/types/BicycleStation';
import { useZoomToStation } from '@/hooks/useZoomToStation';

const ListItem = ({ name, status }: BicycleStation) => {
    const mapRef = useRef(null);
    const [selectedStation, setSelectedStation] = useState<string | null>(null);

    useZoomToStation(mapRef, selectedStation);

    const goToDetails = () => {
        console.log(name)
        setSelectedStation(name);
    };

    return (
        <Card style={styles.card} onPress={goToDetails}>
            <Card.Content>
                <Text variant="titleLarge">{name}</Text>
                <Text variant="bodyMedium">{status}</Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '95%',
        margin: 10,
    },
});

export default ListItem;