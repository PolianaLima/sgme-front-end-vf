import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {http} from "@/utils/http";
import axios from "axios";
import {getUserFromCookie} from "@/utils/Cookies";
import ModalInfo from "@/components/ModalInfo";
import {format, parseISO} from "date-fns";
import {ptBR} from "date-fns/locale";

function Index() {
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState({});

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (cliente) => {
        setSelectedCliente(cliente)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedCliente({})
        setModalIsOpen(false);
    };


    useEffect(() => {
        const dataUser = getUserFromCookie();
        http.get(`/clientes?idUsuario=${dataUser.usuario.id}`,  {
            headers:{
                Authorization:`Bearer ${dataUser.token}`
            }
        })
            .then((response) => {
                setClientes(response.data)
            })
            .catch((error) => {
                if(axios.isAxiosError(error)){
                    console.log(error.response.data)
                }
            });
    }, []);

    return (
        <main className="container border mb-5">
            <div className="container d-sm-flex flex-row justify-content-between mb-3 mt-5">
                <h3>Clientes</h3>
                <Link href="/gestao-sgme/clientes/cadastro" className="btn btn-success">Novo Cliente</Link>
            </div>
            <table className="table">


                <thead>
                <tr className="border border-2 border-warning">
                    <th scope="col">Nome</th>
                    <th scope="col"  className=" d-flex justify-content-end">Ações</th>

                </tr>
                </thead>
                <tbody>

                {clientes && clientes.length> 0 ? (
                    clientes.map(cliente =>
                        <tr key={cliente.id}>

                            <td >
                                {cliente.nome}
                            </td>
                            <td className="d-flex justify-content-end">
                                <img width="30" height="30" className="me-3 pointer-cursor" src="https://img.icons8.com/3d-fluency/94/info.png"
                                     alt="info"
                                onClick={()=>openModal(cliente)}/>
                                <Link href={`/gestao-sgme/clientes/update/${cliente.id}`}
                                      className="btn btn-success me-2">EDITAR</Link>

                            </td>

                        </tr>
                    )) : (
                    <tr>
                    <td colSpan="6">Nenhum cliente encontrado.</td>
                    </tr>
                )}

                </tbody>
            </table>

            <ModalInfo
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >

                <div className="w-100 h-100 p-3">
                    <p className="fw-bold"> Informações</p>
                    <p>Nome: {selectedCliente.nome}</p>
                    <p>CPF: {selectedCliente.cpf}</p>
                    {selectedCliente.data_nascimento && (
                        <p><img width="30" height="30" src="https://img.icons8.com/office/16/birthday.png"
                                alt="birthday"/> {format(parseISO(selectedCliente.data_nascimento), 'dd/MM', {locale: ptBR})}
                        </p>
                    )}
                    <p>Telefone: {selectedCliente.telefone}</p>

                </div>

            </ModalInfo>


        </main>
    );
}

export default Index;