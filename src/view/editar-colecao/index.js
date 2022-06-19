import React, { useState } from "react";
import EstiloEditarColecao from './editar-colecao.module.css';

import { doc, updateDoc } from 'firebase/firestore'
import firestore from '../../config/firebase';
import { Navigate, useParams } from "react-router-dom";

function EditarColecao() {

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagemNome, setImagemNome] = useState('');
    const [imagem, setImagem] = useState([]);
    const [estado, setEstado] = useState('');

    const { idColecao } = useParams();

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

    const alterarDoc = () => {

        const newDoc = {
            nome: nome,
            descricao: descricao,
            imagem: imagem
        }

        const docRef = doc(firestore, "flashcards", idColecao)

        updateDoc(docRef, newDoc)

        setNome('');
        setDescricao('');
        setImagem('');
        setImagemNome('');

        setEstado('alterado');
    }

    return (

        <div className={EstiloEditarColecao.containerPrincipal}>

            {estado === 'alterado' ? <Navigate to='/home' replace /> : null}

            <span>Editar Coleção</span>

            <div className={EstiloEditarColecao.titulo}>
                <h3>Atualize os dados necessários da coleção</h3>
            </div>

            <div className="input-group">

                <div className={EstiloEditarColecao.containerInput}>

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

                    <div className={EstiloEditarColecao.botao}>
                        <button type="submit" className={`${EstiloEditarColecao.btn} btn mt-5`} id={EstiloEditarColecao.salvar} onClick={() => alterarDoc()}>Salvar Alterações</button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default EditarColecao;