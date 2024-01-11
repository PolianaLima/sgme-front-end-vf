import React from 'react';
import Image from "next/image";
import Link from "next/link";


function CardSiteFuncoes({img,title,info,link}) {
    const styles = {

    }
    return (
        <div className=" col-sm-3 d-sm-flex flex-sm-column m-1 p-2 justify-content-end mt-3 mb-2" style={{minHeight:"350"}}>
            <Image src={img} className="align-items-center w-100 mt-2"  width={200} height={200} alt="Icone função pdv "/>
            <h4>{title}</h4>
            <p >{info}</p>
            <Link href={link} className="btn btn-warning w-100">Saiba mais</Link>
        </div>
    );
}

export default CardSiteFuncoes;