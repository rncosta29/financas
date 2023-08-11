import { Image } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
    Container,
    Containerlogo,
    Containerform,
    Titulo,
    Texto,
    Botaoregistro,
    Loginregistro
} from "./styles";
import logo from '../../assets/logo.png';
import { Login } from '../../components/Login';
import { Register } from "../../components/Register";

export function Home() {
    const [isRegistrado, setIsRegistrado] = useState(true);
    const navigation = useNavigation();
    function selecionarTela() {
        setIsRegistrado(!isRegistrado);
    }
    
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
                <Texto>Faça o login ou registre-se para começar</Texto>
                { isRegistrado ? <Login /> : <Register /> }
                <Botaoregistro onPress={() => selecionarTela()}>
                    <Loginregistro>{ isRegistrado ? 'Não ' : 'Já ' }tem cadastro? Clique aqui!</Loginregistro>
                </Botaoregistro>
            </Containerform>
        </Container>
    );
}