import React from 'react';
import { View, StyleSheet } from 'react-native';

import { CommonActions, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getHeaderTitle } from '@react-navigation/elements';
import MapScreen from './map';
import ListScreen from './list';
import { router } from 'expo-router';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const navigation = useNavigation();

  const routes = [
    {
      "name": "map",
      "component": MapScreen,
      "focusedIcon": "map",
      "unfocusedIcon": "map-outline",
      "label": "La carte",
    },
    {
      "name": "list",
      "component": ListScreen,
      "focusedIcon": "cog",
      "unfocusedIcon": "cog-outline",
      "label": "La liste",
    }
  ]

  const handleSearch = () => goTo('Search')

  const goTo = (route) => {
    router.push('/(root)/search');
  }
  
  return (
    <Tab.Navigator
      initialRouteName="map"
      screenOptions={{
        header: ({ navigation, route, options }) => {
          console.log(route)
          const title = getHeaderTitle(options, route.name);
          return (
            <Appbar.Header>
              <Appbar.Content title={title} />
              <Appbar.Action icon="magnify" onPress={handleSearch} />
            </Appbar.Header>
          );
        },
      }}
      tabBar={({ navigation, state, descriptors, insets }) =>  {
        return (
          <>
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
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
          </>
      
        )
    }}
    >
      {routes.map(route => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            title: route.label,
            tabBarIcon: ({ color, focused}) => (
              <Icon
                name={focused ? route.focusedIcon : route.unfocusedIcon}
                color={color}
                size={24}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});