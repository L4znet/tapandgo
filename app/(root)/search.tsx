import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { useSearch } from '../contexts/SearchContext';
const SearchScreen = () => {


    return (
        <View style={styles.container}>
            <Searchbar
                style={styles.searchBar}
                placeholder="Search"
                onChangeText={setSearchTerm}
                value={searchTerm}
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