import { useState } from 'react';
import axios from 'axios';
import { Platform, Pressable, View, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Container, ButtonEmpty, Content, InputDados, ActionView, ActionButton, ActionText, ButtonCancel, ButtonConfirm, TextCancel, TextConfirm } from './styles';
import { env } from 'src/utils/env';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

export function ActionModalCompra({ handleClose, idBanco, token }: any) {
    const [date, setDate] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [dataCompra, setDataCompra] = useState<String>();
    const [localCompra, setLocalCompra] = useState<String>();
    const [valorCompra, setValorCompra] = useState<Double>();
    const [dataApi, setDataApi] = useState<String>();

    const baseURL = env.baseURL;

    const addNewCompra = async (data: String, local: String, valor: Double) => {
        await formatDate(data);
        console.log(dataApi);
        console.log(data);
        console.log(local);
        console.log(valor);
        console.log(idBanco);
        try {
            const response = await axios({
                method: 'post',
                url: `${baseURL}/api/v1/estabelecimento/create`,
                data: {
                    dataCompra: dataApi,
                    estabelecimento: local,
                    valor: valor,
                    banco_id: idBanco
                },
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })

            console.log(response.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    const toggleShowPicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({type}: any, selectedDate:any) => {
        if(type =='set') {
            const currentDate = selectedDate;
            setDate(currentDate);

            if(Platform.OS == 'android') {
                toggleShowPicker();
                setDataCompra(formatDateView(currentDate));
            }
        }
        else {
            toggleShowPicker();
        }
      };

      const confirmOSDate = () => {
        setDataCompra(formatDateView(date));
        toggleShowPicker();
      }

      const formatDateView = (rawDate: any) => {
        let data = new Date(rawDate);

        let year = data.getFullYear();
        let month: any = data.getMonth() + 1;
        let day: any = data.getDate();

        month = month < 10 ? `0${month}` : month
        day = day < 10 ? `0${day}` : day

        setDataApi(`${year}-${month}-${day}`);

        return `${day}/${month}/${year}`;
      }

      const formatDate = (rawDate: any) => {
        let data = new Date(rawDate);

        let year = data.getFullYear();
        let month: any = data.getMonth() + 1;
        let day: any = data.getDate();

        month = month < 10 ? `0${month}` : month
        day = day < 10 ? `0${day}` : day

        setDataApi(`${year}-${month}-${day}`);
        //setDataApi('Rawdate: '+rawDate);
      }

    return (
        <Container>
            <ButtonEmpty onPress={handleClose}></ButtonEmpty>
            <Content>
                <ActionView>
                    {showPicker &&
                        <DateTimePicker
                            mode='date'
                            display='spinner'
                            value={date}
                            onChange={onChange}
                            style={{height:120, marginTop:-10}}
                        />
                    }
                    {showPicker && Platform.OS === 'ios' &&( 
                        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                            <ButtonCancel onPress={toggleShowPicker}>
                                <TextCancel>Calcelar</TextCancel>
                            </ButtonCancel>
                            <ButtonConfirm onPress={confirmOSDate}>
                                <TextConfirm>Confirmar</TextConfirm>
                            </ButtonConfirm>
                        </View>
                    )}
                    {
                        !showPicker && (
                            <Pressable
                                onPress={toggleShowPicker}
                            >
                                <InputDados
                                    value={dataCompra}
                                    onChangeText={setDataCompra}
                                    placeholder="Qual a data da compra"
                                    placeholderTextColor='#A1A1A1'
                                    editable={false}
                                    onPressIn={toggleShowPicker}
                                />
                            </Pressable>
                        )
                    }
                    
                    <InputDados
                        value={localCompra}
                        onChangeText={setLocalCompra}
                        placeholder="Local onde foi feita a compra"
                        placeholderTextColor='#A1A1A1'
                    />
                    <InputDados
                        value={valorCompra}
                        onChangeText={setValorCompra}
                        placeholder="Qual o valor da compra"
                        keyboardType="numeric"
                        placeholderTextColor='#A1A1A1'
                    />
                    <ActionButton onPress={() => addNewCompra(dataCompra!, localCompra!, valorCompra!)}>
                        <ActionText>Adicionar</ActionText>
                    </ActionButton>
                </ActionView>
            </Content>
            <ButtonEmpty onPress={handleClose}></ButtonEmpty>
        </Container>
    )
}