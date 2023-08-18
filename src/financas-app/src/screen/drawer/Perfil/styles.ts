import styled from 'styled-components/native';
import { THEME } from '../../../theme';

export const Container = styled.SafeAreaView`
      flex: 1;
      background-color: ${THEME.COLORS.OVERLAY};
`

export const TituloView = styled.View`
      justify-content: center;
      align-items: center;
      margin-top: 150px;
`

export const Titulo = styled.Text`
      font-size: ${THEME.FONT_SIZE.LG}px;
      font-family: ${THEME.FONT_FAMILY.BLACK};
      color: ${THEME.COLORS.WHITE};
`

export const Imagem = styled.Image`
      margin-top: 40px;
`

export const TextPerfil = styled.Text`
      margin-top: 40px;
      font-size: ${THEME.FONT_SIZE.MD}px;
      font-family: ${THEME.FONT_FAMILY.SEMI_BOLD};
      color: ${THEME.COLORS.WHITE};
`