import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import firestore from "../../config/firebase";
import EstiloColecoes from './colecoes.module.css';

function Colecoes({ id, nome, descricao, imagem }) {

    const excluirColecao = (id) => {
        deleteDoc(doc(firestore, "flashcards", id)).then(window.location.reload());
    }

    return (

        <div id={id} className={EstiloColecoes.cartao}>
            <div className={EstiloColecoes.editarCartao}><Link to={`/editar-colecao/${id}`}><i className="bi bi-pencil"></i></Link></div>
            <div className={EstiloColecoes.cartaoImagem}><img src={imagem} alt="" /></div>
            <div className={EstiloColecoes.cartaoNome}>
                <Link to={`/cartao/${id}`}>{nome}</Link>
            </div>
            <div className={EstiloColecoes.excluirCartao}><i onClick={() => excluirColecao(id)} className="bi bi-trash3"></i></div>
        </div>

    );

}

export default Colecoes;