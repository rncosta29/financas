import React, { ReactNode, createContext, useState } from 'react';
import { ITokenResponseModel, IUserModel } from '../models';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { IBancoModel } from 'src/models/IBancoModel';
import { storage } from 'src/utils/storage';

export const BancoContext = createContext({});

type StackNavigation = {
    Homepage: undefined;
    DrawerRoutes: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

type BancoContextProviderProps = {
    children?: ReactNode;
}

function BancoProvider(props: BancoContextProviderProps) {
    const [user, setUser] = useState<IUserModel>();
    const [banco, setBanco] = useState<IBancoModel>();
    const [tokenResponseModel, setTokenResponseModel] = useState<ITokenResponseModel>();

    const navigation = useNavigation<StackTypes>();

    async function getAllBanco(teste: String) {
        storage.load({
            key: 'token',
            id: '1001'
        }).then(resp => { setTokenResponseModel(resp) });

        await fetch('http://192.168.15.94:8088/api/v1/banco', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+tokenResponseModel?.accessToken
            }
        })
            
            .then((resp) => resp.json())
            .then((json) => setBanco(json))
            /*.then(() => {
                storage.save({
                    key: 'bancoModel',
                    data: banco,
                    expires: 1000*3600,
                    id: '1002'
              });
            })*/
            .catch(err => console.log(err))
    }

    return (
        <BancoContext.Provider value={{ user, getAllBanco, tokenResponseModel, banco }}>
            {props.children}
        </BancoContext.Provider>
    );
}

export default BancoProvider