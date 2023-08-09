import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomStatusBar } from './src/components/CustomStatusBar';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading';
import Routes from './src/routes';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });
  return (
      <NavigationContainer>
        <SafeAreaProvider>
          <CustomStatusBar barStyle='light-content' backgroundColor='#38a690' />
          { fontsLoaded ? <Routes /> : <Loading /> }
        </SafeAreaProvider>
      </NavigationContainer>
  );
}
