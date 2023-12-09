import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, Text, Modal } from 'react-native';
import Moment from 'moment';
import axios from 'axios';


import { IBancoModel } from '../../../models/IBancoModel';
import { storage } from 'src/utils/storage';
import { Container, TituloView, ViewScroll, Titulo, ViewCompras, TextCompras, AddCard, ButtonModalCompra, TextComprar } from './styles';
import TaskCard from '../../../components/TaskCard';
import { IEstabelecimentoModel } from 'src/models/IEstabelecimentoModel';
import { env } from 'src/utils/env';
import { IUserModel } from 'src/models';
import { ActionModal } from 'src/components/Modal';
import { ActionModalCompra } from 'src/components/ModalCompra';

export function Cartoes() {
      const [banco, setBanco] = useState<IBancoModel[]>();
      const [token, setToken] = useState();
      const [compras, setCompras] = useState<IEstabelecimentoModel[]>();
      const [user, setUser] = useState<IUserModel>();
      const [total, setTotal] = useState<number>(0.0);
      const [visibleModal, setVisibleModal] = useState(false);
      const [visibleModalCompras, setVisibleModalCompras] = useState(false);
      const [bancoAtivo, setBancoAtivo] = useState<number>();
      const baseURL = env.baseURL;

      Moment.locale('pt-br');

      const getAllBanco = async () => {
            console.log('Teste de Token: '+token)
            console.log('Teste de User: '+user?.userName)
            try {
                  const response = await axios({
                        method: 'get',
                        url: `${baseURL}/api/v1/banco`,
                        headers: {
                              Authorization: 'Bearer '+token
                        }
                  })
                  setBanco((await response).data)
                  console.log(await response.data)
            }
            catch(err) {
                  console.log('Erro: '+err)
            }
      }

      const getAllCompras = async (id_banco: number, id_user: number) => {
            console.log(id_user);
            try {
                  const response = await axios({
                        method: 'get',
                        url: `${baseURL}/api/v1/estabelecimento/${id_banco}/${id_user}`,
                        headers: {
                              Accept: 'application/json',
                              "Content-Type": 'application/json',
                              Authorization: 'Bearer '+token
                        }
                  })
                  //console.log(await response);
                  setCompras((await response).data)
                  setBancoAtivo(id_banco);
            }
            catch(err) {
                  console.log(err)
            }
      }

      const count = () => {
            setTotal(0)

            let teste = 0;
            compras?.forEach((c) => {
                  teste = teste + c.valor
            })
            setTotal(teste);
      }

      const fetchData = async () => {
            await storage.load({
                  key: 'token',
                  id: '1001'
            }).then((t) => setToken(t));

            await storage.load({
                  key: 'user',
                  id: '1003'
            }).then((u) => setUser(u));
      }

      useEffect(() => {
            fetchData().catch((err) => console.log('Erro do fetch: '+err));
            getAllBanco();
            count();
      }, [compras, token])

      return(
            <Container>
                  <ViewScroll>
                        {banco && (
                              <FlatList
                                    data={banco}
                                    horizontal={true}
                                    renderItem={({item}) => 
                                          <TouchableOpacity onPress={() => getAllCompras(item.id, 1)}>
                                                <TaskCard key={item.id} id={item.id} nomeBanco={item.nomeBanco} urlImagem={item.urlImagem} cor_banco={item.cor_banco} user_id={item.user_id} />
                                          </TouchableOpacity>
                                    }
                                    keyExtractor={(item) => item.id?.toString()}
                              />
                        )}
                        {
                              bancoAtivo !== null && bancoAtivo !== undefined && (
                                    <ButtonModalCompra onPress={() => setVisibleModalCompras(true)}>
                                          <TextComprar>Adicionar compra</TextComprar>
                                    </ButtonModalCompra>
                              )
                        }
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
                                    <TextCompras numberOfLines={1} style={{ width: '25%' }}>{Moment(''+item.dataCompra).format('DD/MM/yyyy')}</TextCompras>
                                    <TextCompras numberOfLines={1} style={{ width: '55%' }}>{item.estabelecimento}</TextCompras>
                                    <TextCompras numberOfLines={1} style={{ width: '20%' }}>
                                          R$ {item.valor.toFixed(2).replace('.',',')}
                                    </TextCompras>
                              </ViewCompras>
                        }
                        keyExtractor={(item) => item.id.toString()}
                  />
                  
                  <TituloView>
                        <Titulo numberOfLines={1} style={{ width: '25%' }}>Total</Titulo>
                        <Titulo numberOfLines={1} style={{ width: '55%' }}></Titulo>
                        <TextCompras numberOfLines={1} style={{ width: '20%' }}>R$ {total.toFixed(2).replace('.',',')}</TextCompras>
                  </TituloView>

                  <AddCard onPress={() => setVisibleModal(true)}>
                        <Text>Add novo card</Text>
                  </AddCard>

                  <Modal
                        visible={visibleModal}
                        transparent={true}
                        onRequestClose={() => setVisibleModal(false)}
                  >
                        <ActionModal handleClose={() => {setVisibleModal(false)}} idUser={user?.id} token={token} />
                  </Modal>
                  <Modal
                        visible={visibleModalCompras}
                        transparent={true}
                        onRequestClose={() => setVisibleModalCompras(false)}
                  >
                        <ActionModalCompra handleClose={() => {setVisibleModalCompras(false)}} idBanco={bancoAtivo} token={token} />
                  </Modal>                 
            </Container>
      );
}