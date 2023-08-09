import { View, Image, Text } from "react-native";

import {
    Container,
    Containerlogo,
    Containerform,
    Titulo,
    Texto,
    Botao,
    BotaoTexto
} from "./styles";
import logo from '../../assets/logo.png';

export function Login() {
    return(
        <Container>
            <Containerlogo>
                <Image
                    source={logo}
                    style={{width:'100%'}}
                    resizeMode="contain"
                />
            </Containerlogo>

            <Containerform>
                <Titulo>Monitore seus gastos de qualquer lugar!</Titulo>
                <Texto>Faça o login para começar</Texto>
            </Containerform>

            <Botao>
                <BotaoTexto>Acessar</BotaoTexto>
            </Botao>
        </Container>
    )
}