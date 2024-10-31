
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import DetailsScreen from './details';

const Stack = createStackNavigator();



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  return (
    <Stack.Navigator
    initialRouteName="search"
    screenOptions={{
      header: ({ navigation, route, options }) => {
        const title = getHeaderTitle(options, route.name);
        return (
          <Appbar.Header>
            <Appbar.Content title={title} />
          </Appbar.Header>
        )
      },
    }}>
      <Stack.Screen name="details" component={DetailsScreen} 
        options={{ title: 'Détail de la station'}}
      />
    </Stack.Navigator>
  );
}
