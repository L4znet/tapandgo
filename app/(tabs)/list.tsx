import { useAllBicycleStations } from '@/hooks/useAllBicycleStations'
import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import ListItem from '@/components/listItem'




const ListScreen = () => {

    return (
        <View style={styles.container}>        
 
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
    }
})

export default ListScreen