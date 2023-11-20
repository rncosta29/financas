import styled from 'styled-components/native';
import { THEME } from '../../../theme';

export const Container = styled.SafeAreaView`
      flex: 1;
      background-color: ${THEME.COLORS.OVERLAY};
`

export const ViewScroll = styled.View`
      margin-left: 5px;
      margin-right: 5px;
      margin-top: 30px;
`

export const Scroll = styled.ScrollView`
      
`

export const Scrolla = styled.FlatList`
      
`

export const TituloView = styled.View`
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: row;
      margin-left: 5px;
      margin-right: 5px;
      margin-top: 30px;
`

export const Titulo = styled.Text`
      font-size: ${THEME.FONT_SIZE.LG}px;
      font-family: ${THEME.FONT_FAMILY.BLACK};
      color: ${THEME.COLORS.WHITE};
`

export const ViewCompras = styled.View`
      justify-content: space-between;
      flex-direction: row;
      margin-left: 5px;
      margin-right: 5px;
      margin-top: 5px;
`
export const TextCompras = styled.Text`
      font-size: ${THEME.FONT_SIZE.SM}px;
      font-family: ${THEME.FONT_FAMILY.REGULAR};
      color: ${THEME.COLORS.WHITE};
`