import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import firestore from "../../config/firebase";
import EstiloCartoes from './cartoes.module.css';

function Cartoes({ id, frente, verso, idColecao }) {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const excluirCartao = (id) => {
        deleteDoc(doc(firestore, "cartoes", id)).then(window.location.reload());
    }

    function editarCartao(id) {
        dispatch({ type: 'EDITAR', id: id })
        navigate('/editar-colecao')
    }


    return (
        <div className={EstiloCartoes.cartoes}>
            {
                <div>

                    <ul className="list-group" data-idcartao="1">
                        <li className={`${EstiloCartoes.listGroupItem} list-group-item`}>
                            <div className={EstiloCartoes.nomeColecao}>
                                <Link to="/novo-cartao">{frente}</Link>
                            </div>
                            <div className={EstiloCartoes.botao}>
                                <button className="btn btn-primary"><i onClick={() => editarCartao(idColecao)} className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger mostarModal"><i onClick={() => excluirCartao(idColecao)} className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>

                </div>
            }
        </div>
    );

}

export default Cartoes;