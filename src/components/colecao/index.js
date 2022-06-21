import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import firestore from "../../config/firebase";
import EstiloColecao from './colecao.module.css';
import { Modal, Button } from "react-bootstrap";

function Colecao({ id, nome, descricao, imagem }) {

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const excluirColecao = (id) => {
        deleteDoc(doc(firestore, "flashcards", id))
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
    }

    return (
        <>
            <div id={id} className={EstiloColecao.cartao}>
                <div className={EstiloColecao.editarCartao}><Link to={`/editar-colecao/${id}`}><i className="bi bi-pencil"></i></Link></div>
                <div className={EstiloColecao.cartaoImagem}><img src={imagem} alt="" /></div>
                <div className={EstiloColecao.cartaoNome}>
                    <Link to={`/cartao/${id}`}>{nome}</Link>
                </div>
                <div className={EstiloColecao.excluirCartao}><i onClick={handleShow} className="bi bi-trash3"></i></div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-dark">Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-dark">Tem certeza que deseja remover essa coleção? Isso excluirá todos os cartões contidos nela.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => excluirColecao(id)}>
                        Sim
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );

}

export default Colecao;