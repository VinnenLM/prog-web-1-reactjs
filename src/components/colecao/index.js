import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { excluirColecao, mensagemErro } from "../../services/colecoes";
import EstiloColecao from "./colecao.module.css";

function Colecao({ id, nome, imagem, uid, somenteLeitura, total }) {
    const [showModal, setShow] = useState(false);
    const [erro, setErro] = useState("");
    const [excluindo, setExcluindo] = useState(false);

    const excluir = async () => {
        setExcluindo(true);
        try {
            await excluirColecao(id, uid);
            setShow(false);
        } catch (e) {
            console.error(e);
            setErro(mensagemErro(e));
            setExcluindo(false);
        }
    };

    return (
        <>
            <div id={id} className={EstiloColecao.cartao}>
                {!somenteLeitura && (
                    <div className={EstiloColecao.editarCartao}>
                        <Link to={`/editar-colecao/${id}`} title="Editar coleção"><i className="bi bi-pencil"></i></Link>
                    </div>
                )}
                <div className={EstiloColecao.cartaoImagem}><img src={imagem} alt="" /></div>
                <div className={EstiloColecao.cartaoNome}>
                    <Link to={`/cartao/${id}`}>{nome}</Link>
                </div>
                {somenteLeitura && <div className={EstiloColecao.selo}>Exemplo{total ? ` · ${total} cartões` : ""}</div>}
                {!somenteLeitura && (
                    <div className={EstiloColecao.excluirCartao}>
                        <i onClick={() => { setErro(""); setShow(true); }} className="bi bi-trash3" title="Excluir coleção"></i>
                    </div>
                )}
            </div>

            <Modal show={showModal} onHide={() => setShow(false)}>
                <Modal.Header>
                    <Modal.Title className="text-dark">Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-dark">
                    Tem certeza que deseja remover a coleção "{nome}"? Isso excluirá todos os cartões contidos nela.
                    {erro && <p className="text-danger mt-2 mb-0">{erro}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" disabled={excluindo} onClick={excluir}>Sim</Button>
                    <Button variant="primary" onClick={() => setShow(false)}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Colecao;
