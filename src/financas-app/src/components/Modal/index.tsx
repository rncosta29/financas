import { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import axios from 'axios';

import { Container, ButtonEmpty, Content, ActionView, ActionButton, ActionText } from './styles';
import { IBancoModel } from 'src/models/IBancoModel';
import { env } from 'src/utils/env';

export function ActionModal({ handleClose, idUser, token }: any) {
    const [bancoModel, setBancoModel] = useState<IBancoModel>();
    const data = [
        {nomeBanco: 'Bradesco', urlImagem: "1", cor_banco: '#fff', user_id: idUser},
        {nomeBanco: 'C6', urlImagem: "2", cor_banco: '#000000', user_id: idUser},
        {nomeBanco: 'Itau Click', urlImagem: "3", cor_banco: '#ec7000', user_id: idUser},
        {nomeBanco: 'Itau Uni', urlImagem: "4", cor_banco: '#003399', user_id: idUser},
        {nomeBanco: 'Magalu', urlImagem: "5", cor_banco: '#d3d3d3', user_id: idUser},
        {nomeBanco: 'Neon', urlImagem: "6", cor_banco: '#1bb1e3', user_id: idUser},
        {nomeBanco: 'Nubank', urlImagem: "7", cor_banco: '#840bd4', user_id: idUser},
        {nomeBanco: 'XP', urlImagem: "8", cor_banco: '#101113', user_id: idUser},
    ];
    const baseURL = env.baseURL;

    const addNewBanco = async (model: IBancoModel) => {
        try {
            const response = await axios({
                method: 'post',
                url: `${baseURL}/api/v1/banco/create`,
                data: {
                    nomeBanco: model.nomeBanco,
                    urlImagem: model.urlImagem,
                    cor_banco: model.cor_banco,
                    user_id: idUser
                },
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer '+token
                }
            })

            console.log(response.data)
        }
        catch(err) {
            console.log(err);
        }
    }

    return(
        <Container>
            <ButtonEmpty onPress={handleClose}></ButtonEmpty>
            <Content>
                <ActionView>
                <SelectDropdown
                        data={data}
                        onSelect={(selectedItem, index) => {
                            setBancoModel(selectedItem)
                        }}
                        buttonStyle={{justifyContent:'center', alignItems:'center', height:40, width:'100%',backgroundColor:'#fff',borderWidth:1, borderRadius:10, padding:5}}
                        defaultButtonText='Selecione o banco desejado'
                        rowTextStyle={{textAlign:'center', fontSize:14}}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem.nomeBanco
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item.nomeBanco
                        }}
                    />
                    <ActionButton onPress={() => addNewBanco(bancoModel!)}>
                        <ActionText>Adicionar</ActionText>
                    </ActionButton>
                </ActionView>
            </Content>
            <ButtonEmpty onPress={handleClose}></ButtonEmpty>
        </Container>
    )
}