import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-reanimated';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';

import { Loading } from './src/components/Loading';
import Routes from './src/routes';
import { Background } from './src/components/Background';
import AuthProvider from './src/contexts/auth';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });
  return (
      <NavigationContainer>
        <AuthProvider>
          <StatusBar barStyle='light-content' />
          { fontsLoaded ? <Routes /> : <Loading /> }
        </AuthProvider>
      </NavigationContainer>
  );
}
