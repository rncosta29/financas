import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { InputDados } from "../TextInput";

import {
    Container,
    Botaologin,
    Logintext
} from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type StackNavigation = {
    Homepage: undefined;
    DrawerRoutes: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export function Login() {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation<StackTypes>();

    function logar(nome: String, senha: String) {
        if(nome === '' && senha === '') {
            navigation.navigate("DrawerRoutes");
            console.log('Acerto - nome: '+nome+' e senha: '+senha);
        } else {
            console.log('Error - nome: '+nome+' e senha: '+senha);
        }
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