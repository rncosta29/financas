import { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth';
import logo from '../../../assets/logo.png';
import { Container, TituloView, Titulo, Imagem, TextPerfil } from './styles';

export function Perfil() {
      const { user }: any = useContext(AuthContext);

      return(
            <Container>
                  <TituloView>
                        <Titulo>Meu perfil</Titulo>
                        <Imagem source={logo} />
                        <TextPerfil>rcosta</TextPerfil>
                  </TituloView>
            </Container>
      );
}