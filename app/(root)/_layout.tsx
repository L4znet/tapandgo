
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect } from 'react';
import 'react-native-reanimated';
import 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

import Search from './search';
import { useColorScheme } from '@/hooks/useColorScheme';
import SearchScreen from './search';

const Stack = createStackNavigator();



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();


  return (
    <Stack.Navigator
    initialRouteName="search"
    screenOptions={{
      header: ({ navigation, route, options }) => {
        console.log(route)
        const title = getHeaderTitle(options, route.name);
        return (
          <Appbar.Header>
            <Appbar.Content title={"Recherche"} />
          </Appbar.Header>
        );
      },
    }}>
      <Stack.Screen name="search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
