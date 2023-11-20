import { useContext, useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';

import { IBancoModel } from '../../../models/IBancoModel';
import { storage } from 'src/utils/storage';
import { AuthContext } from 'src/contexts/auth';
import { Container, TituloView, ViewScroll, Scroll, Titulo, ViewCompras, TextCompras } from './styles';
import TaskCard from '../../../components/TaskCard';
import { IEstabelecimentoModel } from 'src/models/IEstabelecimentoModel';
import { env } from 'src/utils/env';
import { IUserModel } from 'src/models';

export function Cartoes() {
      const [banco, setBanco] = useState<IBancoModel[]>();
      const [token, setToken] = useState();
      const { getAllBanco }: any = useContext(AuthContext);
      const [compras, setCompras] = useState<IEstabelecimentoModel[]>();
      const [user, setUser] = useState<IUserModel>();
      const [userId, setUserId] = useState<number | undefined>();

      async function getAllCompras(id_banco: number, id_user: number) {
            storage.load({
                  key: 'token',
                  id: '1001'
            }).then(resp => { setToken(resp.accessToken) });

            await fetch(`${env.BASE_URL}/api/v1/estabelecimento/${id_banco}/${id_user}`, {
                  method: 'GET',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                  }
            })
                  .then((resp) => resp.json())
                  .then((json) => setCompras(json))
                  .then(() => console.log(compras))
                  .catch((err) => console.log('Erro mano: '+err))
      }

      useEffect(() => {
            getAllBanco()

            storage.load({
                  key: 'bancoModel',
                  id: '1002'
            }).then((resp) => setBanco(resp))

            storage.load({
                  key: 'user',
                  id: '1003'
            }).then((resp) => setUser(resp)).then(() => setUserId(user?.id))

      }, [banco, compras, user])

      return(
            <Container>
                  <ViewScroll>
                        {banco && (
                              <FlatList
                                    data={banco}
                                    horizontal={true}
                                    renderItem={({item}) => 
                                          <TouchableOpacity onPress={() => getAllCompras(item.id, userId!)}>
                                                <TaskCard id={item.id} nomeBanco={item.nomeBanco} urlImagem={item.urlImagem} cor_banco={item.cor_banco} key={item.id} />
                                          </TouchableOpacity>
                                    }
                                    keyExtractor={(item) => item.id.toString()}
                              />
                        )}
                  </ViewScroll>
                  <TituloView>
                        <Titulo numberOfLines={1} style={{ width: '25%' }}>Data</Titulo>
                        <Titulo numberOfLines={1} style={{ width: '55%' }}>Estabelecimento</Titulo>
                        <Titulo numberOfLines={1} style={{ width: '20%' }}>Preço</Titulo>
                  </TituloView>
                  <FlatList
                        data={compras}
                        renderItem={({item}) => 
                              <ViewCompras>
                                    <TextCompras numberOfLines={1} style={{ width: '25%' }}>{item.dataCompra}</TextCompras>
                                    <TextCompras numberOfLines={1} style={{ width: '55%' }}>{item.estabelecimento}</TextCompras>
                                    <TextCompras numberOfLines={1} style={{ width: '20%' }}>R$ {item.valor}</TextCompras>
                              </ViewCompras>
                        }
                        keyExtractor={(item) => item.id.toString()}
                  />
            </Container>
      );
}