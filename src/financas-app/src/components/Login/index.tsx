import { useState, useContext, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { storage } from 'src/utils/storage';
import { env } from '../../utils/env';
import { InputDados } from "../TextInput";

import {
    Container,
    Botaologin,
    Logintext
} from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../../contexts/auth";
import { ITokenResponseModel, IUserModel } from "src/models/IAuthModel";
import { IBancoModel } from "src/models/IBancoModel";

type StackNavigation = {
    Homepage: undefined;
    DrawerRoutes: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export function Login() {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [user, setUser] = useState<IUserModel>();
    const [tokenResponseModel, setTokenResponseModel] = useState<ITokenResponseModel>();
    const [token, setToken] = useState<String>();
    const [userId, setUserId] =useState<number | undefined>();
    const [banco, setBanco] = useState<IBancoModel>();
    //const { signin }: any = useContext(AuthContext);
    const navigation = useNavigation<StackTypes>();
    const baseURL = env.baseURL

    //async function logar(nome: String, pass: String) {
    //    await signin(nome, pass);
    //}

    const logar = async (nome: String, pass: String) => {
        //console.log('Nome: '+ nome+' e Senha: '+pass)
        if (nome === '' || nome === null || pass === '' || pass === null)
            alert('Campos não podem ser vazios ou nulos')
        else {
            try {
                const response = await axios({
                    method: 'post',
                    url: `${baseURL}/auth/signin`,
                    data: {
                        username: nome,
                        password: pass
                    },
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json'
                    }
                })
                    gerarToken(await response.data)
                    //console.log('Id: '+userId)
                    
                    if (response.data.accessToken === '' || response.data.accessToken === null || response.data.accessToken === undefined) {
                        console.log('Nome: ' + nome + ' e senha: ' + pass);
                        console.log(token);
                        alert('Usuário ou senha invalidos!')
                    }
                    else {
                        getUser(response.data.accessToken)
                        storage.save({
                            key: 'token',
                            data: response.data.accessToken,
                            expires: 1000 * 3600,
                            id: '1001'
                        });
                        storage.save({
                            key: 'user',
                            data: user,
                            expires: 1000 * 3600,
                            id: '1003'
                        })
                        navigation.navigate('DrawerRoutes');
                    }
            } catch (err) {
                console.error('Erro: ' + err)
            }
        }
    }

    async function gerarToken(tokenModel: ITokenResponseModel) {
        setToken(tokenModel.accessToken);
    }

    const getUser = async (token: String) => {
        console.log('Token do user: '+ token)
        try {
            const response = await axios({
                method: 'get',
                url: `${baseURL}/auth/find`,
                headers: {
                    "Username": ''+token,
                }
            })
            
                //.then((response) => setUser(response.data))
                //.catch((err) => console.log('Erro do then: ' +err))
            //console.log(response.data)
            setUser((await response).data);
        }
        catch(err) {
            console.log('Erro: '+err);
        }
    }



    useEffect(() => {
    },[tokenResponseModel])

    return (
        <Container>
            <InputDados
                value={username}
                onChangeText={setUsername}
                placeholder="Coloque seu username"
            />
            <InputDados
                value={senha}
                onChangeText={setSenha}
                placeholder="Coloque sua senha"
            />
            
            <Botaologin onPress={() => logar(username, senha)}>
                <Logintext>Entrar</Logintext>
            </Botaologin>
        </Container>
    )
}