import React from 'react';
import Link from "next/link";

function Paginacao({ setPage, totalPages, page }) {

    return (
        <div className="pagination align-items-center w-100 d-sm-flex justify-content-between ">
           <div className="pagination align-items-center">
               <button className="page-link p-2 m-2" onClick={() => setPage(page - 1)} disabled={page === 0}>
                   Anterior
               </button>
               <span>Página {page + 1} de {totalPages}</span>
               <button className="page-link p-2 m-2" onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>
                   Próxima
               </button>
           </div>

            <Link className="link btn btn-warning" href="/gestao-sgme">Voltar para Dashboard</Link>
        </div>
    );
}

export default Paginacao;
