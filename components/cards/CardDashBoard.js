import React from 'react';
import Link from "next/link";

function CardDashBoard({total, valor, tipo, url}) {
    return (
        <Link className="w-100 me-3 link d-flex flex-row  mb-3 rounded-4 pe-3 ps-3 bg-warning"
              href={url}
        >
            <div className=" fw-bold d-flex align-content-center me-3" style={{fontSize: 90}}>{total}</div>
            <div className="d-sm-flex flex-sm-column fs-4 justify-content-start w-100  mt-4 mb-3">
                <div>Contas a {tipo}*</div>
                <div className="fw-bolder fs-1">
                    R$ {valor.toFixed(2)}
                </div>
            </div>
        </Link>
    )
        ;
}

export default CardDashBoard;