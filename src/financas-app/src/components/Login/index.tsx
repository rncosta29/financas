import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { InputDados } from "../TextInput";

import {
    Container,
    Botaologin,
    Logintext
} from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ITokenResponseModel } from "../../models";
import { AuthContext } from "../../contexts/auth";

type StackNavigation = {
    Homepage: undefined;
    DrawerRoutes: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export function Login() {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [tokenResponseModel, setTokenResponseModel] = useState<ITokenResponseModel>();
    const { signin } = useContext(AuthContext);
    const navigation = useNavigation<StackTypes>();

    async function logar(nome: String, pass: String) {
        signin(nome, pass);
        /*
        if(nome === '' || nome === null || pass === '' || pass === null)
            alert('Campos não podem ser vazios ou nulos')
        else {
            await fetch('http://192.168.15.37:8088/auth/signin', {
                method: 'POST',
                body: JSON.stringify({
                    username: nome,
                    password: pass
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((json) => setTokenResponseModel(json))

            if(tokenResponseModel?.accessToken === '' || tokenResponseModel?.accessToken === null || tokenResponseModel?.accessToken === undefined)
                alert('Usuário ou senha invalidos!')

                else {
                    //navigation.push('DrawerRoutes');
                }
                
        }*/
    }

    return(
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