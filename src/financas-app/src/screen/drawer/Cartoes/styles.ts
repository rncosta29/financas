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
      margin-top: 10px;
`

export const ButtonModalCompra = styled.TouchableOpacity`
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 15px;
      justify-content: center;
      align-items: center;
      align-self: center;
      width: 150px;
      height: 30px;
      border-radius: 15px;
      border-color: ${THEME.COLORS.WHITE};
      background-color: ${THEME.COLORS.WHITE};
      border: 1px;
`

export const TextComprar = styled.Text`
      font-size: ${THEME.FONT_SIZE.SM}px;
      font-family: ${THEME.FONT_FAMILY.SEMI_BOLD};
      color: ${THEME.COLORS.SUCCESS};
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

export const AddCard = styled.TouchableOpacity`
      justify-content: center;
      align-items: center;
      margin-left: 50px;
      margin-right: 50px;
      margin-top: 10px;
      height: 50px;
      border: 0.5px;
      border-color: ${THEME.COLORS.WHITE};
      border-radius: 25px;
      background-color: ${THEME.COLORS.WHITE};
`