import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screen/Home';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Homepage'
                component={Home}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    );
}