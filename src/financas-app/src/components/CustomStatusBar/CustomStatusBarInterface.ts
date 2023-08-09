import { StatusBarProps } from "expo-status-bar";
import { StyleProp, ViewProps } from "react-native";

export interface CustomStatusBarProps {
    containerStyle?: StyleProp<ViewProps> | undefined
    backgroundColor?: string
    barStyle?: 'default' | 'dark-content' | 'light-content'
    StatusBarProps?: StatusBarProps
    translucent?: boolean
    animated?: boolean
}