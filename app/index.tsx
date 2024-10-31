import { Redirect } from 'expo-router';

export default function Index() {
    // here we create a dumb index file to force a redirect to the map screen
    return (
      <Redirect href={"/(tabs)/stations"} />
    );
  }