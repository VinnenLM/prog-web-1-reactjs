import { collection, documentId, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cartoes from "../../components/cartoes";
import firestore from "../../config/firebase";
import EstiloCartao from './cartao.module.css';

function Cartao() {

    const [meusCartoes, setMeusCartoes] = useState([]);
    const [minhaColecao, setMinhaColecao] = useState([]);

    const { idColecao } = useParams();

    useEffect(() => {

        const cartao = []
        const colecao = []

        const qCartao = query(collection(firestore, "cartoes"), where('idColecao', '==', idColecao));
        const qColecao = query(collection(firestore, "flashcards"), where(documentId(), '==', idColecao));


        onSnapshot(qCartao, (result) => {
            result.forEach((doc) => {
                const myDoc = {
                    ...doc.data(),
                    id: doc.id
                }
                cartao.push(myDoc)
            });

            setMeusCartoes(cartao)
        });

        onSnapshot(qColecao, (result) => {
            result.forEach((doc) => {
                const myDoc = {
                    ...doc.data(),
                    id: doc.id
                }
                colecao.push(myDoc)
            });

            setMinhaColecao(colecao)
        });

    }, [idColecao]);

    return (
        <div>

            <div className={EstiloCartao.containerPrincipal}>
                {minhaColecao.map((colecao) => <span>Coleção - {colecao.nome}</span>)}
                <div className={`${EstiloCartao.inputBusca} input-group`}>
                    <div className="input-group-prepend">
                        <button className="btn btn-default"><i className="bi bi-search"></i></button>
                    </div>
                    <input className="form-control" type="text" placeholder="Busque por um elemento" />
                </div>
            </div>

            <div className={EstiloCartao.novoCartao}>
                <Link to="/novo-cartao" className={EstiloCartao.btn}>Novo Cartão</Link>
            </div>

            <main className={EstiloCartao.containerPrincipal}>

                {meusCartoes.map(cartao => <Cartoes id={cartao.id} frente={cartao.frente} verso={cartao.verso} idColecao={idColecao} />)}

                <div className="d-flex">
                    <button className={`${EstiloCartao.btn} btn btn-success`} id={EstiloCartao.salvar}>Jogar!</button>
                </div>
            </main>

            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Exclusão</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Tem certeza que deseja remover esse registro?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="excluir">Sim</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cartao;