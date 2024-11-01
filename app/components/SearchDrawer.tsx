import SearchScreen from '@/app/search';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import SearchDrawerContent from './SearchDrawerContent';
import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const SearchDrawer = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator 
            screenOptions={{
                header: ({ navigation, route, options }) => {
                    return (
                      <Appbar.Header style={styles.header}>
                        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
                        <Appbar.Content title={"Rechercher"} style={styles.headerContent} />
                      </Appbar.Header>
                    )
                  },
            }}
            initialRouteName="SearchScreen"  
            drawerContent={props => <SearchDrawerContent/>}
        >
            <Drawer.Screen name="SearchScreen" component={SearchScreen} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    header: {
        elevation: 0,
    },
    headerContent: {
        alignItems: 'center',
    },
});

export default SearchDrawer;