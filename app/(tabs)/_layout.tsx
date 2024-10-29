// TabLayout.js
import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation, Appbar, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getHeaderTitle } from '@react-navigation/elements';
import MapScreen from './map';
import ListScreen from './list';
import { router } from 'expo-router';
import { useNavigationState } from '@react-navigation/native';
import { useSearch } from '../contexts/searchContext';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const navigation = useNavigation();
  const mapRef = useRef(null);  // Créer une référence pour MapScreen
  const [searchQuery, setSearchQuery] = useState('');


  const navigationState = useNavigationState(state => state);

  const getCurrentTabName = () => {
    if (!navigationState) return null;
    const tabRoute = navigationState.routes.find(route => route.name === '(tabs)');
    if (!tabRoute || !tabRoute.state) return null;
    const activeTabIndex = tabRoute.state.index;
    const activeTabRoute = tabRoute.state.routes[activeTabIndex];
    return activeTabRoute.name;
  };
 

  const handleSearch = () => {

    const currentRoute = getCurrentTabName();

    if(currentRoute === 'map') {
      if (mapRef.current) {
        const targetRegion = {
          latitude: 30.8566, 
          longitude: 3.3522,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };


          



        mapRef.current.animateToRegion(targetRegion);
      }
    } else if(currentRoute === 'list') {
   



    }


  };

  return (
    <Tab.Navigator
      initialRouteName="map"
      screenOptions={{
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <Appbar.Header style={styles.header}>
              <Appbar.Content title={title} style={styles.headerContent} />
              <Searchbar
                style={styles.searchBar}
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                onIconPress={handleSearch}
              />
            </Appbar.Header>
          );
        },
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            return options.tabBarIcon ? options.tabBarIcon({ focused, color, size: 24 }) : null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            return options.tabBarLabel ?? options.title ?? route.title;
          }}
        />
      )}
    >
      <Tab.Screen
        name="map"
        options={{
          title: "La carte",
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? "map" : "map-outline"} color={color} size={24} />
          ),
        }}
      >
        {() => <MapScreen ref={mapRef} />}  
      </Tab.Screen>
      <Tab.Screen
        name="list"
        component={ListScreen}
        options={{
          title: "La liste",
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? "cog" : "cog-outline"} color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    display: 'flex',
    flexDirection: 'column',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  searchBar: {
    margin: 20,
    width: '95%',
  },
});
