import { addDoc, collection, documentId, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import firestore from '../../config/firebase';
import EstiloNovoCartao from './novo-cartao.module.css'

function NovoCartao() {

    const { idColecao } = useParams();

    const [frente, setFrente] = useState('');
    const [verso, setVerso] = useState('');
    const [estado, setEstado] = useState('');
    const [minhaColecao, setMinhaColecao] = useState([]);

    useEffect(() => {

        const colecao = []
        const qColecao = query(collection(firestore, "flashcards"), where(documentId(), '==', idColecao));

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

    function adicionar(evt) {
        evt.preventDefault();
        const documento = {
            frente: frente,
            verso: verso,
            idColecao: idColecao,
        }

        const colecao = collection(firestore, "cartoes");

        addDoc(colecao, documento);

        setFrente('');
        setVerso('');

        setEstado('salvo');
    }


    return (
        <main>

            {estado === 'salvo' ? <Navigate to={`/cartao/${idColecao}`} replace /> : null}

            <div className={EstiloNovoCartao.containerPrincipal}>
                {minhaColecao.map((colecao) => <span>Coleção - {colecao.nome}</span>)}

                <div className={EstiloNovoCartao.titulo}>
                    <h3>Preencha os dados da frente e do verso do flashcard</h3>
                </div>

                <div className={EstiloNovoCartao.cartao}>
                    <span>Frente</span>
                    <div className={EstiloNovoCartao.cartaoFrente}>
                        <input className={EstiloNovoCartao.inputNomes} placeholder='Nome' value={frente} onChange={(evt) => setFrente(evt.target.value)}></input>
                    </div>
                    <div className={EstiloNovoCartao.separacao}></div>
                    <span>Verso</span>
                    <div className={EstiloNovoCartao.cartaoVerso}>
                        <input className={EstiloNovoCartao.inputNomes} placeholder='Nome' value={verso} onChange={(evt) => setVerso(evt.target.value)}></input>
                    </div>
                </div>

                <div className="d-flex">
                    <button className={`${EstiloNovoCartao.btn}`} id={EstiloNovoCartao.salvar} onClick={adicionar}>Cadastrar</button>
                </div>
            </div>
        </main>
    )
}

export default NovoCartao;