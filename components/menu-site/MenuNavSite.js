import React from 'react';
import Link from "next/link";
import Image from "next/image";

function MenuNavSite(props) {
    return (
        <nav className=" container-fluid navbar  navbar-expand-lg" style={{background: " #4682B4"}}>
            <div className="container d-sm-flex">

                <div className="container d-sm-flex flex-nowrap justify-content-between">
                    <div className="justify-content-between d-flex">
                        <Link className="navbar-brand nav-link-light img-fluid" href="/">
                            <Image src="/img/logotipo.svg" width="0"
                                   height="0"
                                   alt="Logotipo Sistema de Gestao de Microempreendedores"
                                   style={{width: '150px', height: 'auto'}}/>

                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">


                        <ul
                            className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-end align-items-center"
                        >
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-light me-4"
                                    href="/funcionalidades"
                                >Funcionalidades</Link
                                >
                            </li>
                            <li className="nav-item">
                                <Link  className="nav-link text-light me-4" href="/planos"
                                >Planos</Link
                                >
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light me-4" href="/parceiros"
                                >Parceiros</Link
                                >
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light me-4" href="/blog"
                                >Blog da SGME</Link
                                >
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light me-4" href="/sobre"
                                >Sobre</Link
                                >
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light me-4" href="/faleconosco"
                                >Fale Conosco</Link
                                >
                            </li>
                            <li className="nav-item">
                                <Link
                                    href="/login"
                                    className="btn btn-warning ps-4 pe-4 pb-0 pt-0"
                                >LOGIN</Link
                                >
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default MenuNavSite;