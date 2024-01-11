'use client';
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Head from "next/head";
import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";
import ModalComponent from "@/components/ModalComponent";

const UpdateFornecedor = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        router.push('/gestao-sgme/fornecedores')
    };

    const router = useRouter();

    const [errorApi, setErroApi] = useState()
    const [resultErro, setResultErro] = useState(false)
    const [status, setStatus] = useState([false])
    const {codigo} = router.query;


    const [fornecedor, setFornecedor] = useState(
        {
            cnpj: "",
            nome: "",

        }
    );


    useEffect(() => {

        const dataUser = getUserFromCookie();

        if (codigo) {
            http.get(`/fornecedores/${codigo}`, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
                .then((response) => {
                    setFornecedor(response.data)
                })
                .catch((response) => {
                    console.error('Erro atualizar busca na pagina!')
                })
        }

    }, [codigo])

    const handleUpdateFornecedor = async () => {
        const dataUser = getUserFromCookie();

        await http.put(`/fornecedores/${codigo}`, fornecedor, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
            .then((response) => {
                setResultErro(false)
                abrirModal()
            })
            .catch((error) => {
                if (axios.isAxiosError(error)) {
                    setResultErro(true)
                    setErroApi(error.response.data.message)
                }
            });

    }

    const abrirModal = (erroApi) => {
        setStatus(true)
        openModal()
    }

    console.log(errorApi)

    const handleInputChange = (e) => {
        setFornecedor({...fornecedor, [e.target.name]: e.target.value});
    };
    const handlerCancelar = () => {
        router.push('/gestao-sgme/fornecedores');
    }

    return (
        <>
            <Head>
                <title>SGME - Alterando Fornecedor</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>

            </Head>
            <div className="container-sm d-flex align-items-center justify-content-start mt-5">

                <form className="form-control-sm w-100" style={{maxWidth:"50%"}}>
                    <h3 className="mb-4">Atualizando Fornecedor</h3>
                    <div className="d-flex flex-column">
                        <label htmlFor="valor">Cpnj / CPF: </label>
                        <input placeholder="Cnpj / Cpf"
                               className="form-control"
                               name="codigo"
                               value={fornecedor.cnpj}
                               onChange={handleInputChange}
                        />

                        {resultErro === true ? (
                            <p className="text-danger fw-bold">{errorApi}</p>
                        ) : ("")}
                    </div>

                    <div className="d-flex flex-row justify-content-between mb-3">
                        <div className="d-flex flex-column w-100">
                            <label htmlFor="valor">Razão Social / Nome: </label>
                            <input placeholder="Razao Social / NOme"
                                   className="form-control"
                                   name="nome"
                                   value={fornecedor.nome}
                                   onChange={handleInputChange}
                            />

                        </div>


                    </div>
                    <div className="d-flex">
                        <button className="btn btn-success pe-3 ps-3 me-3" onClick={(e) => {
                            e.preventDefault();
                            const promise = handleUpdateFornecedor();
                            // openModal()
                        }}>SALVAR
                        </button>

                        <button className="btn btn-danger pe-3 ps-3" onClick={(e) => {
                            e.preventDefault();
                            handlerCancelar();

                        }}>CANCELAR
                        </button>
                    </div>


                    <ModalComponent
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                    >
                        {status === true ? (
                            <div>
                                <p className="fw-bold text-success">Fornecedor alterado com sucesso</p>
                            </div>

                        ) : (
                            <>
                                <p>Erro ao atualizar</p>
                                <p>{errorApi}</p>

                            </>

                        )}
                    </ModalComponent>
                </form>

            </div>
        </>
    )
}

export default UpdateFornecedor;