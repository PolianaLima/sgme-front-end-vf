import {useRouter} from "next/router";

function ButtonFechar({url}) {
    const router = useRouter();



    return (
       < div className="d-flex justify-content-end">
        <button className="btn btn-danger" onClick={(e) => {
        e.preventDefault();
        router.push(`${url}`)
    }}>X
    </button>
</div>
    );
}

export default ButtonFechar;