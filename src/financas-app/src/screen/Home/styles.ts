import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${THEME.COLORS.BACKGROUND_G};
`

export const Containerlogo = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const Containerform = styled.View`
    flex: 2;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    padding-left: 5%;
    padding-right: 5%;
`

export const Titulo = styled.Text`
    font-size: ${THEME.FONT_SIZE.LG}px;
    font-weight: bold;
    margin-top: 28px;
    margin-bottom: 12px;
`

export const Texto = styled.Text`
    color: ${THEME.COLORS.WHITE};
`

export const Botao = styled.TouchableOpacity`
    position: absolute;
    background-color: aqua;
    border-radius: 50px;
    padding-left: 8px;
    padding-right: 8px;
    width: 60%;
    height: 50px;
    align-self: center;
    bottom: 15%;
    align-items: center;
    justify-content: center;
`

export const BotaoTexto = styled.Text`
    font-size: ${THEME.FONT_SIZE.SM}px;
    color: ${THEME.COLORS.OVERLAY};
`

export const Botaoregistro = styled.TouchableOpacity`
    margin-top: 15px;
    margin: 10px;
    align-items: flex-end;
`

export const Loginregistro = styled.Text`
    color: ${THEME.COLORS.BACKGROUND_800};
    font-size: ${THEME.FONT_SIZE.MD}px;
`