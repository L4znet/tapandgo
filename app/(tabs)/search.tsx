import { useAllBicycleStations } from '@/hooks/useAllBicycleStations'
import { router } from 'expo-router';
import React from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { Card, Searchbar } from 'react-native-paper';

const SearchScreen = () => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const { stations, loading, error } = useAllBicycleStations();
    const [filteredStations, setFilteredStations] = React.useState(stations);

    React.useEffect(() => {
        setFilteredStations(stations);
    }, [stations]);

    const handleSearch = () => {
        const filtered = stations.filter(station => station.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredStations(filtered);
    }

    const handleClearSearch = () => {
        setSearchQuery('');
        setFilteredStations(stations);
    }

    const goToDetail = (station) => {
        router.push({
          pathname: '/details',
          params: {
            stationNumber: station.number,
            contractName: station.contractName,
          },
        });
      }

    const renderItem = ({ item }) => (
        <Card style={styles.card} onPress={() => goToDetail(item)}>
          <Card.Content>
            <Text style={{color:"white"}}>{item.name}</Text>
          </Card.Content>
        </Card>
      );



    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
            </View> 
            <View style={{flex: 1, width: '100%'}}>
                <FlatList
                    horizontal={false}
                    initialNumToRender={7}
                    data={filteredStations}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    card:{
        width: '95%',
        margin: 10,
    },
    searchBarContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 80,
        backgroundColor: '#1e1e1e',
      },
      searchBar: {
        margin: 20,
        width: '95%',
        color: 'white'
    },
})

export default SearchScreen