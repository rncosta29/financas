import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Container = styled.SafeAreaView`
    flex: 1;
`

export const Titulo = styled.Text`
    margin-top: 100px;
    text-align: center;
    font-size: ${THEME.FONT_SIZE.LG};
    font-family: ${THEME.FONT_FAMILY.BLACK};
    color: ${THEME.COLORS.BACKGROUND_900};
`