
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

import SearchScreen from './search';

const Stack = createStackNavigator();



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

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
