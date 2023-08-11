import { useState } from "react";
import { InputDados } from "../TextInput";

import {
    Container,
    Botaologin,
    Logintext
} from "./styles";

export function Register() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [confirmarSenha, setConfirmarSenha] = useState();

    return(
        <Container>
            <InputDados
                value={username}
                onChangeText={setUsername}
                placeholder="Coloque seu username"
            />
            <InputDados
                value={email}
                onChangeText={setEmail}
                placeholder="Coloque seu email"
            />
            <InputDados
                value={senha}
                onChangeText={setSenha}
                placeholder="Coloque sua senha"
            />
            <InputDados
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                placeholder="Confirme sua senha"
            />
            <Botaologin>
                <Logintext>Registrar</Logintext>
            </Botaologin>
        </Container>
    )
}