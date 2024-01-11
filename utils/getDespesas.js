import { getUserFromCookie } from "@/utils/Cookies";
import { http } from "@/utils/http";

export const getDespesasData = async () => {
    try {
        const dataUser = getUserFromCookie();

        const response = await http.get(`/despesas?idUsuario=${dataUser.usuario.id}`, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        });

        const despesas = response.data;

        // Correção: Usar receita.cliente_id em vez de receita.id
        const idFornecedor = despesas.map((despesa) => despesa.fornecedor_id);

        const uniqueIdFornecedor = [...new Set(idFornecedor)];

        const fornecedorResponses = await Promise.all(
            uniqueIdFornecedor.map((id) => http.get(`/fornecedores/${id}`, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            }))
        );

        // Adicione verificações aqui para garantir que os dados sejam válidos

        const fornecedorMap = fornecedorResponses
            .filter((res) => res.data.hasOwnProperty("nome"))
            .reduce((map, fornecedorResponse) => {
                const fornecedor = fornecedorResponse.data;
                map[fornecedor.id] = fornecedor.nome;
                return map;
            }, {});

        return despesas.map((despesa) => ({
            ...despesa,
            nomeFornecedor: fornecedorMap[despesa.fornecedor_id]
        }));
    } catch (error) {
        console.error("Erro ao buscar dados", error);
        throw error; // Rejeitar o erro para que o chamador possa lidar com ele
    }
};
