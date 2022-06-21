import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import firestore from "../../config/firebase";
import EstiloLinha from './linha.module.css';
import { Modal, Button } from "react-bootstrap";

function Linha({ id, frente, verso, idColecao }) {

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const excluirCartao = (id) => {
        deleteDoc(doc(firestore, "cartoes", id));
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
    }

    return (
        <>
            <div className={EstiloLinha.cartoes}>
                <div>

                    <ul className="list-group">
                        <li className={`${EstiloLinha.listGroupItem} list-group-item`}>
                            <div className={EstiloLinha.nomeColecao}>
                                <span to="/novo-cartao">{frente}</span>
                            </div>
                            <div className={EstiloLinha.botao}>
                                <button className="btn btn-primary"><Link to={`/editar-cartao/${idColecao}/${id}`} className='text-white'><i className="bi bi-pencil-square"></i></Link></button>
                                <button className="btn btn-danger mostarModal"><i onClick={handleShow} className="bi bi-trash-fill"></i></button>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-dark">Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-dark">Tem certeza que deseja remover esse registro?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => excluirCartao(id)}>
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

export default Linha;