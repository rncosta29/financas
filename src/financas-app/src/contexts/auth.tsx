import React, {ReactNode, createContext, useEffect, useState } from 'react';
import { storage } from 'src/utils/storage';
import { ITokenResponseModel, IUserModel } from '../models';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { IBancoModel } from 'src/models/IBancoModel';
import { env } from '../utils/env';
import { IEstabelecimentoModel } from 'src/models/IEstabelecimentoModel';

export const AuthContext = createContext({});

type StackNavigation = {
      Homepage: undefined;
      DrawerRoutes: undefined;
}
  
export type StackTypes = NativeStackNavigationProp<StackNavigation>;

type AuthContextProviderProps = {
      children?: ReactNode;
}

function AuthProvider(props: AuthContextProviderProps) {
      const [user, setUser] = useState<IUserModel>();
      const [tokenResponseModel, setTokenResponseModel] = useState<ITokenResponseModel>();
      const [banco, setBanco] = useState<IBancoModel>();

      const navigation = useNavigation<StackTypes>();

      function signin(nome: String, pass: String) {
            if(nome === '' || nome === null || pass === '' || pass === null)
                  alert('Campos não podem ser vazios ou nulos')
            else {
                  fetch(`${env.baseURL}/auth/signin`, {
                        method: 'POST',
                        body: JSON.stringify({
                              username: nome,
                              password: pass
                        }),
                        headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                        }})
                              //.then((r) => console.log(r))
                              .then((response) => response.json())
                              .then((json) => setTokenResponseModel(json))
                              .then((a) => console.log(a))

                        if(tokenResponseModel?.accessToken === '' || tokenResponseModel?.accessToken === null || tokenResponseModel?.accessToken === undefined){
                              console.log(`${env.baseURL}/auth/signin`);
                              alert('Usuário ou senha invalidos!')
                        }

                        else {
                              getUser(tokenResponseModel.accessToken)
                              storage.save({
                                    key: 'token',
                                    data: tokenResponseModel,
                                    expires: 1000*3600,
                                    id: '1001'
                              });
                              navigation.navigate('DrawerRoutes');
                        }

            }
      }

      async function getUser(token: String) {
            await fetch(`${env.baseURL}/auth/find`, {
                  method: 'GET',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Username': ''+token
                  }
            })
                  .then((response) => response.json())
                  .then((json) => setUser(json))
                  .then(() => {
                        storage.save({
                              key: 'user',
                              data: user,
                              expires: 1000*3600,
                              id: '1003'
                        })
                  })
      }

      async function getAllBanco() {
            storage.load({
                key: 'token',
                id: '1001'
            }).then(resp => { setTokenResponseModel(resp) });
    
            await fetch(`${env.baseURL}/api/v1/banco`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+tokenResponseModel?.accessToken
                }
            })
                
                .then((resp) => resp.json())
                .then((json) => setBanco(json))
                .then(() => {
                    storage.save({
                        key: 'bancoModel',
                        data: banco,
                        expires: 1000*3600,
                        id: '1002'
                  });
                })
                //.then(() => console.log(banco))
                .catch(err => console.log(err))
        }

      return(
            <AuthContext.Provider value={{ user, signin, getAllBanco, tokenResponseModel, banco }}>
                  {props.children}
            </AuthContext.Provider>
      );
}

export default AuthProvider