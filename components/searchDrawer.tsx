import SearchScreen from '@/app/search';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Drawer } from 'react-native-paper';
import SearchDrawerContent from './searchDrawerContent';

const searchDrawer = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="SearchScreen"
            drawerContent={props => <SearchDrawerContent/>}>
        <Drawer.Screen name="SearchScreen" component={SearchScreen} />
      </Drawer.Navigator>
    );
}

export  default searchDrawer;

