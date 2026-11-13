import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ehMock } from "../../data/mock";
import { atualizarColecao, carregarColecao, mensagemErro } from "../../services/colecoes";
import { redimensionar } from "../../utils/imagem";
import EstiloEditarColecao from './editar-colecao.module.css';

function EditarColecao() {
    const { idColecao } = useParams();

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagemNome, setImagemNome] = useState('');
    const [imagem, setImagem] = useState('');
    const [imagemNova, setImagemNova] = useState('');
    const [estado, setEstado] = useState(ehMock(idColecao) ? 'alterado' : 'carregando');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (ehMock(idColecao)) return;
        carregarColecao(idColecao)
            .then((c) => {
                if (!c) {
                    setEstado('inexistente');
                    return;
                }
                setNome(c.nome || '');
                setDescricao(c.descricao || '');
                setImagem(c.imagem || '');
                setEstado('pronto');
            })
            .catch((e) => {
                console.error(e);
                setMsg(mensagemErro(e));
                setEstado('erro');
            });
    }, [idColecao]);

    async function inserirImagem(evt) {
        const arquivo = evt.target.files[0];
        if (!arquivo) return;
        try {
            setImagemNova(await redimensionar(arquivo));
            setImagemNome(arquivo.name);
        } catch (e) {
            setMsg(e.message);
        }
    }

    const alterarDoc = async () => {
        if (nome.trim() === '' || descricao.trim() === '') {
            setMsg('Preencha o nome e a descrição!');
            return;
        }
        try {
            const dados = { nome: nome.trim(), descricao: descricao.trim() };
            if (imagemNova) dados.imagem = imagemNova;
            await atualizarColecao(idColecao, dados);
            setEstado('alterado');
        } catch (e) {
            console.error(e);
            setMsg(mensagemErro(e));
        }
    }

    if (estado === 'alterado') return <Navigate to='/home' replace />;
    if (estado === 'carregando') return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Carregando...</p>;
    if (estado === 'inexistente') return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Coleção não encontrada.</p>;
    if (estado === 'erro') return <p style={{ textAlign: 'center', marginTop: '3rem' }}>{msg}</p>;

    return (
        <div className={EstiloEditarColecao.containerPrincipal}>
            <span>Editar Coleção</span>

            <div className={EstiloEditarColecao.titulo}>
                <h3>Atualize os dados necessários da coleção</h3>
            </div>

            <div className="input-group">
                <div className={EstiloEditarColecao.containerInput}>
                    <label htmlFor="nome">Nome coleção</label>
                    <input className="form-control" type="text" id="nome" placeholder="Insira o nome da coleção" value={nome} onChange={(evt) => setNome(evt.target.value)} />
                    <label htmlFor="descricao">Descrição</label>
                    <textarea className="form-control" id="descricao"
                        placeholder="Descreva os detalhes da coleção" value={descricao} onChange={(evt) => setDescricao(evt.target.value)}></textarea>
                    <label htmlFor="imagem">Imagem</label>

                    <div className="input-group">
                        <input hidden accept="image/*" id="imagem" type="file" onChange={inserirImagem} />
                        <label className="seletor-arquivo" htmlFor="imagem">
                            <img src={imagemNova || imagem} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6, marginRight: 8 }} />
                            {imagemNome === '' ? 'Trocar imagem...' : imagemNome}
                        </label>
                    </div>

                    <div className={EstiloEditarColecao.botao}>
                        <button type="submit" className={`${EstiloEditarColecao.btn} btn mt-5`} id={EstiloEditarColecao.salvar} onClick={alterarDoc}>Salvar Alterações</button>
                    </div>

                    {msg && <span>{msg}</span>}
                </div>
            </div>
        </div>
    )
}

export default EditarColecao;
