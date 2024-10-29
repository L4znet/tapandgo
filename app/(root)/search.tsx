import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'
const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <View style={styles.container}>
            <Searchbar
                style={styles.searchBar}
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        margin: 10,
    },
});


export default SearchScreen