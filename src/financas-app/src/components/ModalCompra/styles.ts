import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Container = styled.SafeAreaView`
      flex: 1;
`

export const ButtonEmpty = styled.TouchableOpacity`
    flex: 1;
    margin-top: 50px;
    z-index: 9;
`

export const Content = styled.View`
    flex: 1;
    margin: 20px;
`

export const InputDados = styled.TextInput`
    height: 50px;
    margin: 10px;
    border-width: 1px;
    border-radius: 15px;
    background-color: ${THEME.COLORS.WHITE};
    padding-left: 10px;
    padding-right: 10px;
`

export const ActionView = styled.View`
    z-index: 99;
    background-color: ${THEME.COLORS.FOOTER};
    border-radius: 20px;
    margin-top: 10px;
    padding: 10px;
    border-width: 8px;
    border-color: ${THEME.COLORS.WHITE};
`

export const ActionButton = styled.TouchableOpacity`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    padding: 10px;
    border-width: 1px;
    width: 150px;
    align-self: center;
    border-radius: 20px;
    border-color: ${THEME.COLORS.SUCCESS};
    background-color: ${THEME.COLORS.WHITE};
`

export const ActionTitle = styled.Text`
    text-align: center;
    font-weight: ${THEME.FONT_FAMILY.BOLD};
    font-size: ${THEME.FONT_SIZE.MD};
`

export const ActionText = styled.Text`
    text-align: center;
    font-weight: ${THEME.FONT_FAMILY.BOLD};
    font-size: ${THEME.FONT_SIZE.SM};
    color: ${THEME.COLORS.SUCCESS};
`

export const ButtonCancel = styled.TouchableOpacity`
    border-width: 1px;
    border-color: ${THEME.COLORS.ALERT};
    background-color: white;
    width: 120px;
    height: 25px;
    justify-content: center;
    border-radius: 10px;
`

export const ButtonConfirm = styled.TouchableOpacity`
    border-width: 1px;
    border-color: ${THEME.COLORS.SUCCESS};
    background-color: white;
    width: 120px;
    height: 25px;
    justify-content: center;
    border-radius: 10px;
`

export const TextCancel = styled.Text`
    text-align: center;
    font-size: ${THEME.FONT_SIZE.SM};
    color: ${THEME.COLORS.ALERT};
`

export const TextConfirm = styled.Text`
    text-align: center;
    font-size: ${THEME.FONT_SIZE.SM};
    color: ${THEME.COLORS.SUCCESS};
`