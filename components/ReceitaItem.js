import React from 'react';
import Link from "next/link";

function DespesaItem({despesa}) {
    return (
        <tr key={despesa.id}>
            <td>{despesa.nomeCliente}</td>
            <td>R$ {despesa.valor.toFixed(2)}</td>
            <td>R$ </td>
            <td className="d-flex justify-content-end">
                <Link href={`/gestao-sgme/financeiro/contas-a-receber/update/${despesa.id}`} className="btn btn-success me-2">EDITAR</Link>
                <Link href={`/gestao-sgme/financeiro/contas-a-receber/delete/${despesa.id}`} className="btn btn-danger">EXCLUIR</Link>
            </td>
        </tr>
    );
}

export default DespesaItem;