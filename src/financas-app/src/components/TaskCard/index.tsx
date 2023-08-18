import { View, Text, Image } from 'react-native';

import bradescoImg from '../../assets/bradesco.png';

import {
      Card,
      CardTitle,
      CardImage
} from './styles';

export default function TaskCard() {
      return(
            <Card>
                  <CardImage source={bradescoImg} />
                  <CardTitle>Bradesco</CardTitle>
            </Card>
      )
}