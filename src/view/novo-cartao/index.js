import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useUid } from "../../hooks/useColecoes";
import { carregarColecao, criarCartao, mensagemErro } from "../../services/colecoes";
import EstiloNovoCartao from './novo-cartao.module.css'

function NovoCartao() {
    const { idColecao } = useParams();
    const uid = useUid();

    const [frente, setFrente] = useState('');
    const [verso, setVerso] = useState('');
    const [estado, setEstado] = useState('');
    const [nomeColecao, setNomeColecao] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        carregarColecao(idColecao)
            .then((c) => setNomeColecao(c?.nome || ''))
            .catch(() => setNomeColecao(''));
    }, [idColecao]);

    async function adicionar(evt) {
        evt.preventDefault();
        if (frente.trim() === '' || verso.trim() === '') {
            setMsg('Preencha a frente e o verso!');
            return;
        }
        try {
            await criarCartao(uid, idColecao, { frente: frente.trim(), verso: verso.trim() });
            setEstado('salvo');
        } catch (e) {
            console.error(e);
            setMsg(mensagemErro(e));
        }
    }

    return (
        <main>
            {estado === 'salvo' ? <Navigate to={`/cartao/${idColecao}`} replace /> : null}

            <div className={EstiloNovoCartao.containerPrincipal}>
                {nomeColecao && <span>Coleção - {nomeColecao}</span>}

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

                {msg && <span>{msg}</span>}
            </div>
        </main>
    )
}

export default NovoCartao;
