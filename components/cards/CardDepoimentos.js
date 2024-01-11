import React from 'react';

function CardDepoimentos({depoimento, usuario}) {
    return (
        <div className=" rounded rounded-2 border border-2 p-3 me-1 mb-3" style={{width:400}}>
            <p>{depoimento}</p>
            <p className="text-danger fw-bold">{usuario}</p>
        </div>
    );
}

export default CardDepoimentos;