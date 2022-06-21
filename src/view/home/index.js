import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firestore from '../../config/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore'

import EstiloHome from './home.module.css';
import Colecao from "../../components/colecao";

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
                    {minhaColecao.map(colecao => <Colecao id={colecao.id} nome={colecao.nome} descricao={colecao.descricao} imagem={colecao.imagem} />)}
                </div>
            </div>

        </>

    )
}

export default Home;