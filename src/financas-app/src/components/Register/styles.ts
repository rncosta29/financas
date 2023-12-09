import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Container = styled.View`
    flex: 1;
    margin-top: 30px;
`

export const Botaologin = styled.TouchableOpacity`
    height: 50px;
    margin: 10px;
    border-width: 1px;
    border-radius: 15px;
    background-color: ${THEME.COLORS.SUCCESS};
    justify-content: center;
    align-items: center;
`

export const Logintext = styled.Text`
    color: ${THEME.COLORS.WHITE};
    font-size: ${THEME.FONT_SIZE.MD}px;
    font-weight: bold;
`