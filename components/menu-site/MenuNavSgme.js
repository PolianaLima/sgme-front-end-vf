import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import {useAuth} from "/context/authContext"

function MenuNavSgme(props) {

    const {user, logout} = useAuth();

    const router = useRouter()

    return (
        <>

            <nav className="navbar navbar-expand-lg" style={{background: " #4682B4"}}>
                <div className="container">
                    <Link className="navbar-brand " href="/gestao-sgme">
                        <Image src="/img/logotipo.svg"
                               width="80"
                               height="70"
                               className="w-100"
                               alt="Logotipo Sistema de Gestao de Microempreendedores"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item ">
                                <Link className="nav-link text-light" href="/gestao-sgme">DashBoard</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-light" href="#" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false">
                                    Cadastro
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/gestao-sgme/clientes">Clientes</Link></li>
                                    <li><Link className="dropdown-item"
                                              href="/gestao-sgme/fornecedores">Fornecedores</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-light" href="#" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false">
                                    Financeiro
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/gestao-sgme/financeiro/contas-a-receber">Contas
                                        a Receber</Link></li>
                                    <li><Link className="dropdown-item" href="/gestao-sgme/financeiro/contas-a-pagar">Contas
                                        a Pagar</Link></li>
                                </ul>
                            </li>

                            {/*<li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown"
                                  aria-expanded="false">
                                Relatorios
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="#">Contas a Receber</Link></li>
                                <li><Link className="dropdown-item" href="#">Contas a Pagar</Link></li>
                            </ul>
                        </li>*/}

                        </ul>
                        <div className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-light" href="#" role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false">
                                <Image width="48" height="48" src="/img/user.gif" alt="Icone de Usuario"/>
                                {user.nome}
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <button className="dropdown-item" onClick={(e) => {
                                        e.preventDefault();
                                        logout()
                                        router.push('/login')
                                    }}>Sair
                                    </button>
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>
            </nav>

        </>
    )

}

export default MenuNavSgme;