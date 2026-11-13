import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUid } from "../../hooks/useColecoes";
import { criarColecao, mensagemErro } from "../../services/colecoes";
import { imagemPadrao, redimensionar } from "../../utils/imagem";
import EstiloNovaColecao from './nova-colecao.module.css';

function NovaColecao() {
    const uid = useUid();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagemNome, setImagemNome] = useState('');
    const [imagem, setImagem] = useState('');
    const [estado, setEstado] = useState('');
    const [msg, setMsg] = useState('');
    const [salvando, setSalvando] = useState(false);

    async function adicionar(evt) {
        evt.preventDefault();
        if (nome.trim() === '' || descricao.trim() === '') {
            setMsg('Preencha o nome e a descrição!');
            return;
        }
        setSalvando(true);
        setMsg('');
        try {
            await criarColecao(uid, {
                nome: nome.trim(),
                descricao: descricao.trim(),
                imagem: imagem || imagemPadrao(nome),
            });
            setEstado('salvo');
        } catch (e) {
            console.error(e);
            setMsg(mensagemErro(e));
            setSalvando(false);
        }
    }

    async function inserirImagem(evt) {
        const arquivo = evt.target.files[0];
        if (!arquivo) return;
        try {
            setImagem(await redimensionar(arquivo));
            setImagemNome(arquivo.name);
        } catch (e) {
            setMsg(e.message);
        }
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
                        <textarea className="form-control" id="descricao"
                            placeholder="Descreva os detalhes da coleção" value={descricao} onChange={(evt) => setDescricao(evt.target.value)}></textarea>
                        <label htmlFor="imagem">Imagem (opcional)</label>

                        <div className="input-group">
                            <input hidden accept="image/*" id="imagem" type="file" onChange={inserirImagem} />
                            <label className="custom-file-label" htmlFor="imagem">{imagemNome === '' ? 'Escolha uma imagem para a coleção...' : imagemNome}</label>
                        </div>

                        <div className={EstiloNovaColecao.botao}>
                            <button type="submit" className="btn mt-5" id={EstiloNovaColecao.salvar} onClick={adicionar} disabled={salvando}>Cadastrar</button>
                        </div>

                        {msg && <span>{msg}</span>}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default NovaColecao;
