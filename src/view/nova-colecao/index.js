import React, { useState } from "react";
import EstiloNovaColecao from './nova-colecao.module.css';
import firestore from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore'
import { Navigate } from "react-router-dom";

function NovaColecao() {

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagemNome, setImagemNome] = useState('');
    const [imagem, setImagem] = useState([]);
    const [estado, setEstado] = useState('');

    function adicionar(evt) {
        evt.preventDefault();
        const documento = {
            nome: nome,
            descricao: descricao,
            imagem: imagem,
        }

        const colecao = collection(firestore, "flashcards");

        addDoc(colecao, documento);

        setNome('');
        setDescricao('');
        setImagem('');
        setImagemNome('');

        setEstado('salvo');
    }

    function inserirImagem(evt) {

        var reader = new FileReader();
        reader.readAsDataURL(evt.target.files[0]);

        reader.onload = () => {
            setImagem(reader.result);
        };

        reader.onerror = error => {
            console.log(error);
        };

        setImagemNome(evt.target.value);
    }

    return (
        <main>

            {estado === 'salvo' ? <Navigate to='/home' replace /> : null}

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
                            <input hidden accept="image/*" id="imagem" type="file" onChange={inserirImagem} />
                            <label className="custom-file-label" htmlFor="imagem">{imagemNome === '' ? 'Escolha uma imagem para a coleção...' : imagemNome}</label>
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