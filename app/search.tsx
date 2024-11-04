import { useAllBicycleStations } from '@/app/hooks/useAllBicycleStations'
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { Card, Searchbar } from 'react-native-paper';
import { useSearch } from './contexts/SearchContext';
import { BicycleStation } from '@/types/BicycleStation';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { stations, loading, error } = useAllBicycleStations();
    const [filteredStations, setFilteredStations] = useState<BicycleStation[]>([]);

    const { isStationOpened, isBiclooAvailable } = useSearch();

    useEffect(() => {
        const applyFilters = () => {
            let filtered = stations || [];
         
            if (isStationOpened !== 'all') {
                filtered = filtered.filter(station => {
                  return isStationOpened === 'opened' ? station.status === 'OPEN' : station.status === 'CLOSED';
                }
                );
            }

            if (isBiclooAvailable !== 'yes') {
                filtered = filtered.filter(station => {
                  isBiclooAvailable === 'yes' ? station.totalStands.availabilities.bikes > 0 : station.totalStands.availabilities.bikes === 0
                }
                );
            }

            if (searchQuery) {
                filtered = filtered.filter(station =>
                    station.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            setFilteredStations(filtered);
        };

        applyFilters();
    }, [stations, isStationOpened, isBiclooAvailable, searchQuery]);

    const handleSearch = (query: React.SetStateAction<string>) => {
        setSearchQuery(query);
    };

    const goToDetail = (station: { number: any; contractName: any; }) => {
        router.push({
          pathname: '/details',
          params: {
            stationNumber: station.number,
            contractName: station.contractName,
          },
        });
    };

    const renderItem = ({ item }: { item: any }) => (
        <Card style={styles.card} onPress={() => goToDetail(item)}>
          <Card.Content>
            <Text style={{ color: "white" }}>{item.name}</Text>
          </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Rechercher une station"
                onChangeText={handleSearch}
                value={searchQuery}
                style={styles.searchBar}
            />
            <View style={{ flex: 1, width: '100%' }}>
                <FlatList
                    horizontal={false}
                    initialNumToRender={7}
                    data={filteredStations}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name.toString()}
                    onEndReachedThreshold={0.5}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        width: '95%',
        margin: 10,
    },
    searchBar: {
        margin: 20,
        width: '95%',
        color: 'white',
    },
});

export default SearchScreen;
