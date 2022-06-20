import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import firestore from "../../config/firebase";
import EstiloLinha from './linha.module.css';

function Linha({ id, frente, verso, idColecao }) {

    const excluirCartao = (id) => {
        deleteDoc(doc(firestore, "cartoes", id)).then(window.location.reload());
    }

    return (
        <div className={EstiloLinha.cartoes}>
            {
                <div>

                    <ul className="list-group">
                        <li className={`${EstiloLinha.listGroupItem} list-group-item`}>
                            <div className={EstiloLinha.nomeColecao}>
                                <span to="/novo-cartao">{frente}</span>
                            </div>
                            <div className={EstiloLinha.botao}>
                                <button className="btn btn-primary"><Link to={`/editar-cartao/${idColecao}/${id}`} className='text-white'><i className="bi bi-pencil-square"></i></Link></button>
                                <button className="btn btn-danger mostarModal"><i onClick={() => excluirCartao(id)} className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>

                </div>
            }
        </div>
    );

}

export default Linha;