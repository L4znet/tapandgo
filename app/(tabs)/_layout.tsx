import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation, Appbar, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getHeaderTitle } from '@react-navigation/elements';
import StationsScreen from './stations';
import SearchScreen from './search';
import { useNavigationState } from '@react-navigation/native';
import { useSearch } from '../contexts/SearchContext';
import ItineraryScreen from './itinerary';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const mapRef = useRef(null); // Here we add a ref for mapscreen

  const { coordinates } = useSearch();

  useEffect(() => {
    if (mapRef.current && coordinates.latitude && coordinates.longitude) {
      const targetRegion = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: coordinates.latitudeDelta || 0.0922,
        longitudeDelta: coordinates.longitudeDelta || 0.0421,
      };
      mapRef.current.animateToRegion(targetRegion);
    }
  }, [coordinates]);

  return (
    <Tab.Navigator
      initialRouteName="stations"
      screenOptions={{
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <Appbar.Header style={styles.header}>
              <Appbar.Content title={title} style={styles.headerContent} />
            </Appbar.Header>
          )
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
        name="stations"
        options={{
          title: "Les stations",
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? "map" : "map-outline"} color={color} size={24} />
          ),
        }}
      >
        {() => <StationsScreen ref={mapRef} />}  
      </Tab.Screen>
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          title: "Rechercher",
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? "magnify" : "magnify"} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="itinerary"
        component={ItineraryScreen}
        options={{
          title: "Itinéraire",
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? "map-marker-path" : "map-marker-path"} color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 50,
    display: 'flex',
    flexDirection: 'column',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    color: 'white',
  },
  searchBarContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    color: 'white',
  },
  searchBar: {
    margin: 20,
    width: '95%',
    color: 'white',
    },

});