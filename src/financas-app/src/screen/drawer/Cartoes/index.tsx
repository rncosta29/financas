import { Container, TituloView, ViewScroll, Scroll, Titulo, ViewCompras, TextCompras } from './styles';
import TaskCard from '../../../components/TaskCard';

export function Cartoes() {
      return(
            <Container>
                  <ViewScroll>
                        <Scroll horizontal={true}>
                              <TaskCard />
                              <TaskCard />
                              <TaskCard />
                        </Scroll>
                  </ViewScroll>
                  <TituloView>
                        <Titulo numberOfLines={1} style={{ width: '25%' }}>Data</Titulo>
                        <Titulo numberOfLines={1} style={{ width: '55%' }}>Estabelecimento</Titulo>
                        <Titulo numberOfLines={1} style={{ width: '20%' }}>Preço</Titulo>
                  </TituloView>
                  <ViewCompras>
                        <TextCompras numberOfLines={1} style={{ width: '25%' }}>10/08/2023</TextCompras>
                        <TextCompras numberOfLines={1} style={{ width: '55%' }}>Ifood</TextCompras>
                        <TextCompras numberOfLines={1} style={{ width: '20%' }}>R$ 25,00</TextCompras>
                  </ViewCompras>
                  <ViewCompras>
                        <TextCompras numberOfLines={1} style={{ width: '25%' }}>11/08/2023</TextCompras>
                        <TextCompras numberOfLines={1} style={{ width: '55%' }}>Martha Gourmet</TextCompras>
                        <TextCompras numberOfLines={1} style={{ width: '20%' }}>R$ 55,00</TextCompras>
                  </ViewCompras>
            </Container>
      );
}