import { View, Text, Image } from 'react-native';

import { storage } from 'src/utils/storage';
import { ITokenResponseModel } from 'src/models/IAuthModel';
import { BancoContext } from 'src/contexts/bank';
import bradescoImg from '../../assets/bradesco.png';
import { typeIcons } from '../../utils/typeicons';

import {
      Card,
      CardTitle,
      CardImage
} from './styles';
import { IBancoModel } from 'src/models/IBancoModel';
import { useEffect, useState } from 'react';
import { IEstabelecimentoModel } from 'src/models/IEstabelecimentoModel';
import { env } from 'src/utils/env';

export default function TaskCard({id, cor_banco, nomeBanco, urlImagem}: IBancoModel) {
      const [compras, setCompras] = useState<IEstabelecimentoModel[]>();
      const [token, setToken] = useState();

      

      return(
            <Card bgColor={cor_banco}>
                  <CardImage source={typeIcons[urlImagem]} />
                  <CardTitle>{nomeBanco}</CardTitle>
            </Card>
      )
}