import React from 'react';
import Image from "next/image";
import Link from "next/link";

function CardSiteBlog({img, title, info, fonte, link,}) {
    return (
        <div className="col-sm-5 d-sm-flex flex-sm-column m-1 p-2 justify-content-end mt-3 mb-2">
            <div>
                <Image src={img} alt="Icone blog" height={200} width={300}/>
            </div>
            <div>
                <h4>{title}</h4>
                <p className="">{info}</p>
                <Link href={link} className="btn btn-success  fw-bold">Saiba mais...</Link>
                <p  className="link text-danger fw-bold mt-2">Fonte {fonte}</p>
            </div>

        </div>
    );
}

export default CardSiteBlog;