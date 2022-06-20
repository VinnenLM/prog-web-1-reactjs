import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firestore from '../../config/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore'

import EstiloHome from './home.module.css';
import Colecoes from "../../components/colecoes";

function Home() {

    const [minhaColecao, setMinhaColecao] = useState([]);

    useEffect(() => {

        const colecoes = []

        const q = query(collection(firestore, "flashcards"));

        onSnapshot(q, (result) => {
            result.forEach((doc) => {
                const myDoc = {
                    ...doc.data(),
                    id: doc.id
                }
                colecoes.push(myDoc)
            });

            setMinhaColecao(colecoes)
        });

    }, []);


    return (

        <>

            <div className={`${EstiloHome.containerPrincipal} ${EstiloHome.botao}`}>
                <Link to="/nova-colecao" className={`${EstiloHome.btn} btn-default`}>Nova Coleção</Link>
            </div>

            <div className={EstiloHome.containerPrincipal}>
                <div className={EstiloHome.cartoes}>
                    {minhaColecao.map(colecao => <Colecoes id={colecao.id} nome={colecao.nome} descricao={colecao.descricao} imagem={colecao.imagem} />)}
                </div>
            </div>

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
                            <p>Tem certeza que deseja remover essa coleção? Isso excluirá todos os cartões contidos nela.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="excluir">Sim</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Home;