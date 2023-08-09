import { View, StatusBar } from 'react-native';
import { CustomStatusBarProps } from './CustomStatusBarInterface';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CustomStatusBar = (props: CustomStatusBarProps) => {
    const inserts = useSafeAreaInsets();

    return(
        <View style={[{ top: inserts.top }, props.containerStyle]}>
            <StatusBar
                animated={props.animated}
                backgroundColor={props.backgroundColor}
                barStyle={props.barStyle}
                translucent={props.translucent}
            />
        </View>
    );
}