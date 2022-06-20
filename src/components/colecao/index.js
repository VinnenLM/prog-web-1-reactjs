import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import firestore from "../../config/firebase";
import EstiloColecao from './colecao.module.css';

function Colecao({ id, nome, descricao, imagem }) {

    const excluirColecao = (id) => {
        deleteDoc(doc(firestore, "flashcards", id)).then(window.location.reload());
    }

    return (

        <div id={id} className={EstiloColecao.cartao}>
            <div className={EstiloColecao.editarCartao}><Link to={`/editar-colecao/${id}`}><i className="bi bi-pencil"></i></Link></div>
            <div className={EstiloColecao.cartaoImagem}><img src={imagem} alt="" /></div>
            <div className={EstiloColecao.cartaoNome}>
                <Link to={`/cartao/${id}`}>{nome}</Link>
            </div>
            <div className={EstiloColecao.excluirCartao}><i onClick={() => excluirColecao(id)} className="bi bi-trash3"></i></div>
        </div>

    );

}

export default Colecao;