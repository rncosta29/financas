import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Card = styled.View`
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 10px;
      width: 200px;
      margin-left: 5px;
      margin-right: 5px;
      height: 100px;
      border-width: 0.5px;
      border-radius: 15px;
      border-color: ${THEME.COLORS.WHITE};
      background-color: ${(props: { bgColor: any }) => {
            return props.bgColor}
      }
`

export const CardImage = styled.Image`
      width: 50px;
      height: 50px;
`

export const CardTitle = styled.Text`
      margin-left: 10px;
      font-family: ${THEME.FONT_FAMILY.BOLD};
      font-size: ${THEME.FONT_SIZE.MD}px;
      color: ${THEME.COLORS.WHITE};
`