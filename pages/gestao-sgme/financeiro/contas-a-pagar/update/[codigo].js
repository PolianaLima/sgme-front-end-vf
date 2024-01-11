import Head from "next/head";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {http} from "@/utils/http";
import ModalComponent from "@/components/ModalComponent";
import ButtonFechar from "@/components/ButtonFechar";
import {getUserFromCookie} from "@/utils/Cookies";
import {isAfter, parseISO} from "date-fns";

const UpdateDespesas = () => {
    const router = useRouter();
    const {codigo} = router.query;

    const [erroData, setErroData] = useState(false)
    const [erroDados, setErroDados] = useState("")

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        router.push('/gestao-sgme/financeiro/contas-a-pagar')
    };


    const [despesa, setDespesa] = useState({});

    const [fornecedor, setFornecedor] = useState({});

    const [status, setStatus] = useState([false])


    useEffect(() => {
        if (codigo) {
            const dataUser = getUserFromCookie();
            http.get(`/despesas/${codigo}`, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
                .then((response) => {
                        setDespesa(response.data)
                    }
                )
                .catch((error) => {
                    console.log("Erro ao buscar receita" + error)
                })
        }

    }, [codigo])


    useEffect(() => {
        const dataUser = getUserFromCookie();
        if (despesa.fornecedor_id)
            http.get(`/fornecedores/${despesa.fornecedor_id}`, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
                .then((response) => {
                    setFornecedor(response.data)
                })
                .catch((error) => console.log("Erro ao buscar cliente" + error))
    }, [despesa.fornecedor_id])

    const handleUpdateDespesa = async () => {
        const dataUser = getUserFromCookie();

        if (erroData !== true) {
            try {
                await http
                    .put(`/despesas/${codigo}`, despesa, {
                        headers: {
                            Authorization: `Bearer ${dataUser.token}`
                        }
                    })
                    .then((response) => {
                        setStatus(true)
                    })
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.error('Erro na resposta da API:', error.response.data);
                } else {
                    console.error('Erro ao enviar dados para a API:', error);
                }
            }

        } else {
            setErroDados("Nao foi possivel atualizar os dados, corrija os erros e tente novamente")
        }

    };

    const handleInputChange = (e) => {
        setDespesa({...despesa, [e.target.name]: e.target.value});
        console.log(despesa)
    };

    const handlerCancelar = () => {
        router.push('/gestao-sgme/financeiro/contas-a-pagar');
    }


    const validateDataVencimento = (value) => {
        const dataVencimento = parseISO(value);
        const dataAtual = new Date();

        return isAfter(dataVencimento, dataAtual) || dataVencimento.toDateString() === dataAtual.toDateString();
    };


    return (
        <>
            <Head>
                <title>SGME - Editando conta</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>

            </Head>
            <div className="container d-flex align-items-center justify-content-center mt-5">

                <form className="form-control p-5">

                    <ButtonFechar url="/gestao-sgme/financeiro/contas-a-pagar"/>

                    <h1>{fornecedor.nome}</h1>
                    <input value={fornecedor.id}
                           name="fornecedor_id"
                           hidden
                           onChange={handleInputChange}

                    />

                    <div>
                        <p><b>Status:</b> {despesa.status}</p>
                    </div>

                    <div className="d-sm-flex flex-row justify-content-between mb-3">
                        <div className="d-flex flex-column w-100 me-3">
                            <label htmlFor="valor">Valor: </label>
                            <input placeholder="R$"
                                   className="form-control"
                                   value={despesa.valor}
                                   name="valor"
                                   onChange={handleInputChange}
                            />

                        </div>


                        <div className="d-flex flex-column w-100">
                            <label htmlFor="data_vencimento">Data Vencimento: </label>
                            <input type="date"
                                   className="form-control"
                                   value={despesa.data_vencimento}
                                   name="data_vencimento"
                                   onChange={(e) => {
                                       handleInputChange(e);
                                       if (!validateDataVencimento(e.target.value)) {
                                           setErroData(true)
                                       }
                                   }}
                            />

                            {erroData === true ? (
                                <p className="alert alert-danger mt-3">A data de vencimento deve ser maior ou igual à
                                    data atual.</p>
                            ) : ("")}

                        </div>
                    </div>

                    <div className="d-sm-flex flex-row justify-content-between mb-3">

                        <div className="d-flex flex-column me-3 w-100">
                            <label htmlFor="forma_pagamento">Forma de Pagamento</label>
                            <select className="form-select"
                                    value={despesa.forma_pagamento}
                                    name="forma_pagamento"
                                    onChange={handleInputChange}
                            >
                                <option hidden value={despesa.forma_pagamento}>{despesa.forma_pagamento}</option>
                                <option value="DINHEIRO">DINHEIRO</option>
                                <option value="PIX">PIX</option>
                                <option value="CARTAO">CARTAO</option>
                                <option value="BOLETO">BOLETO</option>
                            </select>


                        </div>

                        <div className="d-sm-flex flex-column w-100">
                            <label htmlFor="status">Status</label>
                            <select className="form-select"
                                    value={despesa.status}
                                    name="status"
                                    onChange={handleInputChange}
                            >
                                <option value={despesa.status} hidden>{despesa.status}</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Pago">Pago</option>
                            </select>

                        </div>

                    </div>

                    <div className="d-sm-flex flex-row justify-content-between mb-3">
                        <div className="d-flex flex-column w-100 me-3">
                            <label htmlFor="observacao">Observação: </label>
                            <textarea placeholder="Observação"
                                      className="form-control"
                                      value={despesa.observacao}
                                      name="observacao"
                                      onChange={handleInputChange}
                            />

                        </div>
                    </div>

                    <div className="w-100 d-flex justify-content-end">
                        <button className="btn btn-success me-3" onClick={(e) => {
                            e.preventDefault();
                            handleUpdateDespesa()
                            openModal()
                        }}>ALTERAR
                        </button>
                    </div>


                    <ModalComponent
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                    >
                        {status === true ? (
                            <div>
                                <p className="fw-bold text-success">Conta alterada com sucesso</p>
                            </div>

                        ) : (
                            <>
                                <p>Erro ao atualizar</p>
                                <p>{erroDados}</p>
                            </>

                        )}

                    </ModalComponent>


                </form>

            </div>
        </>
    )
}
export default UpdateDespesas;