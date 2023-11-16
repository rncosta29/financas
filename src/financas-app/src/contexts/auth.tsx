import React, {ReactNode, createContext, useState } from 'react';
import { ITokenResponseModel, IUserModel } from '../models';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

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

      const navigation = useNavigation<StackTypes>();

      async function signin(nome: String, pass: String) {
            if(nome === '' || nome === null || pass === '' || pass === null)
                  alert('Campos não podem ser vazios ou nulos')
            else {
                  await fetch('http://192.168.15.94:8088/auth/signin', {
                        method: 'POST',
                        body: JSON.stringify({
                              username: nome,
                              password: pass
                        }),
                        headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                        }})
                              .then((response) => response.json())
                              .then((json) => setTokenResponseModel(json))

                        if(tokenResponseModel?.accessToken === '' || tokenResponseModel?.accessToken === null || tokenResponseModel?.accessToken === undefined)
                              alert('Usuário ou senha invalidos!')

                        else {
                              getUser(tokenResponseModel.accessToken)
                              navigation.navigate('DrawerRoutes');
                        }

            }
      }

      async function getUser(token: String) {
            await fetch('http://192.168.15.94:8088/auth/find', {
                  method: 'GET',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Username': ''+token
                  }
            })
                  .then((response) => response.json())
                  .then((json) => setUser(json))
      }
      return(
            <AuthContext.Provider value={{ user, signin, tokenResponseModel }}>
                  {props.children}
            </AuthContext.Provider>
      );
}

export default AuthProvider