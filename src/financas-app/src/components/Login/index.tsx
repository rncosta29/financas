import { useState, useContext } from "react";

import { InputDados } from "../TextInput";

import {
    Container,
    Botaologin,
    Logintext
} from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../../contexts/auth";

type StackNavigation = {
    Homepage: undefined;
    DrawerRoutes: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export function Login() {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const { signin }: any = useContext(AuthContext);

    async function logar(nome: String, pass: String) {
        await signin(nome, pass);
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