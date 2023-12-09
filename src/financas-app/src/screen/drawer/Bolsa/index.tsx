import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import axios from 'axios';
import { SvgUri } from 'react-native-svg';

import { env } from 'src/utils/env';
import { Container } from './styles';
import { IBolsaModel, IStocksModel } from "src/models/IBolsaModel";

export function Bolsa() {
    const [bolsa, setBolsa] = useState<IBolsaModel[]>();
    const [stocks, setStocks] = useState<IStocksModel[]>();
    const [page, setPage] = useState<number>(1);

    const getAllBolsa = async() => {
        const response = axios({
            method: 'get',
            url: `${env.urlBolsa}/quote/list?token=sSLxht9XZbS4ZXMkVuC5ky&limit=10&page=${page}`
        })
        setStocks((await response).data.stocks);
        //console.log((await response).data);
        console.log(stocks);
    }

    const init = () => {
        getAllBolsa()
    }

    useEffect(() => {
        init()
    },[bolsa, page])
    
    return(
        <Container>
            <FlatList
                data={stocks}
                renderItem={({item}) =>
                    <View>
                        <SvgUri width='70' height='70' uri={item.logo} />
                        <Text>Sigla: {item.stock}</Text>
                        <Text>Nome: {item.name}</Text>
                        <Text>Preço: R${item.close}</Text>
                    </View>
                }
                keyExtractor={item => item.stock.toString()}
            />
            <View style={{justifyContent:'space-around', alignItems:'center'}}>
                <TouchableOpacity onPress={() => setPage(page - 1)}>
                    <Text style={{fontSize: 20, color:'#fff'}}>Anterior</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 20, color:'#fff'}}>{page}</Text>
                <TouchableOpacity onPress={() => setPage(page + 1)}>
                    <Text style={{fontSize: 20, color:'#fff'}}>Próxima</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}