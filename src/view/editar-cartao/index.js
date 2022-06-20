import { collection, doc, documentId, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import EstiloEditarCartao from './editar-cartao.module.css';
import firestore from "../../config/firebase";

function EditarCartao() {

    const [frente, setFrente] = useState('');
    const [verso, setVerso] = useState('');
    const [estado, setEstado] = useState('');

    const [minhaColecao, setMinhaColecao] = useState([]);

    const { idColecao, idCartao } = useParams();


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

    const alterarDoc = () => {

        const newDoc = {
            frente: frente,
            verso: verso,
            idColecao: idColecao
        }

        const docRef = doc(firestore, "cartoes", idCartao)

        updateDoc(docRef, newDoc)

        setFrente('');
        setVerso('');

        setEstado('alterado');
    }

    return (
        <main>
            {estado === 'alterado' ? <Navigate to={`/cartao/${idColecao}`} replace /> : null}
            <div className={EstiloEditarCartao.containerPrincipal}>
                {minhaColecao.map((colecao) => <span>Coleção - {colecao.nome}</span>)}

                <div className={EstiloEditarCartao.titulo}>
                    <h3>Atualize os dados da frente e do verso do flashcard</h3>
                </div>

                <div className={EstiloEditarCartao.cartao}>
                    <span>Frente</span>
                    <div className={EstiloEditarCartao.cartaoFrente}>
                        <input className={EstiloEditarCartao.inputNomes} id="frente" placeholder="Nome" value={frente} onChange={(evt) => setFrente(evt.target.value)}></input>
                    </div>
                    <div className={EstiloEditarCartao.separacao}></div>
                    <span>Verso</span>
                    <div className={EstiloEditarCartao.cartaoVerso}>
                        <input className={EstiloEditarCartao.inputNomes} id="verso" placeholder="Nome" value={verso} onChange={(evt) => setVerso(evt.target.value)}></input>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <button className={`${EstiloEditarCartao.btn} btn btn-default`} id={EstiloEditarCartao.salvar} onClick={() => alterarDoc()}>Salvar alterações</button>
                </div>
            </div>
        </main>
    )
}

export default EditarCartao;