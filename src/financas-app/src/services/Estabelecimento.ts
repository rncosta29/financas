import { Api } from "src/providers";

const getAllCompras = (idBanco: number, idUser: number) => {
    Api.post(`/api/v1/estabelecimento/${idBanco}/${idUser}`)
}

export const EstabelecimentoService = {
    getAllCompras
}