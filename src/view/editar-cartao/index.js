import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { atualizarCartao, carregarCartao, carregarColecao, mensagemErro } from "../../services/colecoes";
import EstiloEditarCartao from './editar-cartao.module.css';

function EditarCartao() {
    const { idColecao, idCartao } = useParams();

    const [frente, setFrente] = useState('');
    const [verso, setVerso] = useState('');
    const [estado, setEstado] = useState('carregando');
    const [msg, setMsg] = useState('');
    const [nomeColecao, setNomeColecao] = useState('');

    useEffect(() => {
        carregarColecao(idColecao)
            .then((c) => setNomeColecao(c?.nome || ''))
            .catch(() => setNomeColecao(''));
        carregarCartao(idCartao)
            .then((c) => {
                if (!c) {
                    setEstado('inexistente');
                    return;
                }
                setFrente(c.frente || '');
                setVerso(c.verso || '');
                setEstado('pronto');
            })
            .catch((e) => {
                console.error(e);
                setMsg(mensagemErro(e));
                setEstado('erro');
            });
    }, [idColecao, idCartao]);

    const alterarDoc = async () => {
        if (frente.trim() === '' || verso.trim() === '') {
            setMsg('Preencha a frente e o verso!');
            return;
        }
        try {
            await atualizarCartao(idCartao, { frente: frente.trim(), verso: verso.trim() });
            setEstado('alterado');
        } catch (e) {
            console.error(e);
            setMsg(mensagemErro(e));
        }
    }

    if (estado === 'alterado') return <Navigate to={`/cartao/${idColecao}`} replace />;
    if (estado === 'carregando') return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Carregando...</p>;
    if (estado === 'inexistente') return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Cartão não encontrado.</p>;
    if (estado === 'erro') return <p style={{ textAlign: 'center', marginTop: '3rem' }}>{msg}</p>;

    return (
        <main>
            <div className={EstiloEditarCartao.containerPrincipal}>
                {nomeColecao && <span>Coleção - {nomeColecao}</span>}

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
                    <button className={`${EstiloEditarCartao.btn} btn btn-default`} id={EstiloEditarCartao.salvar} onClick={alterarDoc}>Salvar alterações</button>
                </div>

                {msg && <span>{msg}</span>}
            </div>
        </main>
    )
}

export default EditarCartao;
