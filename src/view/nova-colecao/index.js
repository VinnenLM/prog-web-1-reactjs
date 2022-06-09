import React, { useState } from "react";
import EstiloNovaColecao from './nova-colecao.module.css';
import firestore from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore'
import { Navigate } from "react-router-dom";

function NovaColecao() {

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [imagem, setImagem] = useState('')

    function adicionar(evt) {
        evt.preventDefault();
        const documento = {
            nome: nome,
            descricao: descricao,
            imagem: imagem
        }

        const colecao = collection(firestore, "flashcards");

        addDoc(colecao, documento);

        setNome('');
        setDescricao('');
        setImagem('');

        <Navigate to='/home' replace />
    }

    return (
        <main>

            <div className={EstiloNovaColecao.containerPrincipal}>

                <span>Nova Coleção</span>

                <div className={EstiloNovaColecao.titulo}>
                    <h3>Preencha os dados referente à coleção a ser criada</h3>
                </div>

                <div className="input-group">

                    <div className={EstiloNovaColecao.containerInput}>

                        <label htmlFor="nome">Nome coleção</label>
                        <input className="form-control" type="text" id="nome" placeholder="Insira o nome da coleção" value={nome} onChange={(evt) => setNome(evt.target.value)} />
                        <label htmlFor="descricao">Descrição</label>
                        <textarea className="form-control" type="text" id="descricao"
                            placeholder="Descreva os detalhes da coleção" value={descricao} onChange={(evt) => setDescricao(evt.target.value)}></textarea>
                        <label htmlFor="imagem">Imagem</label>

                        <div className="input-group">
                            <input hidden type="file" id="imagem" value={imagem} onChange={(evt) => setImagem(evt.target.value)} />
                            <label className="custom-file-label" htmlFor="imagem">{imagem === '' ? 'Escolha uma imagem para a coleção...' : imagem}</label>
                        </div>

                        <div className={EstiloNovaColecao.botao}>
                            <button type="submit" className="btn mt-5" id={EstiloNovaColecao.salvar} onClick={adicionar}>Cadastrar</button>
                        </div>

                    </div>

                </div>
            </div>

        </main>
    )
}

export default NovaColecao;