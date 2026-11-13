import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { excluirCartao, mensagemErro } from "../../services/colecoes";
import EstiloLinha from "./linha.module.css";

function Linha({ id, frente, verso, idColecao, somenteLeitura, mostrarTodas }) {
  const [aberto, setAberto] = useState(false);
  useEffect(() => setAberto(mostrarTodas), [mostrarTodas]);
  const [showModal, setShow] = useState(false);
  const [erro, setErro] = useState("");

  const excluir = async () => {
    try {
      await excluirCartao(id);
      setShow(false);
    } catch (e) {
      console.error(e);
      setErro(mensagemErro(e));
    }
  };

  return (
    <>
      <div className={EstiloLinha.cartoes}>
        <ul className="list-group">
          <li className={`${EstiloLinha.listGroupItem} list-group-item`}>
            <div className={EstiloLinha.nomeColecao}>
              <span>{frente}</span>
              {aberto && <span className={EstiloLinha.resposta}> → {verso}</span>}
            </div>
            <div className={EstiloLinha.botao}>
              <button
                type="button"
                className={`${EstiloLinha.olho} ${aberto ? EstiloLinha.olhoAtivo : ""}`}
                onClick={() => setAberto(!aberto)}
                title={aberto ? "Ocultar resposta" : "Ver resposta"}
                aria-label={aberto ? "Ocultar resposta" : "Ver resposta"}
                aria-pressed={aberto}
              >
                <i className={`bi ${aberto ? "bi-eye-slash" : "bi-eye"}`}></i>
                <span>{aberto ? "Ocultar" : "Ver resposta"}</span>
              </button>
              {!somenteLeitura && (
                <>
                <Link
                  to={`/editar-cartao/${idColecao}/${id}`}
                  className="btn btn-primary text-white"
                  style={{ borderColor: "white" }}
                >
                  <i className="bi bi-pencil-square"></i>
                </Link>
                <button
                  className="btn btn-danger"
                  style={{ borderColor: "white" }}
                  onClick={() => { setErro(""); setShow(true); }}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
                </>
              )}
            </div>
          </li>
        </ul>
      </div>

      <Modal show={showModal} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title className="text-dark">Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          Tem certeza que deseja remover esse registro?
          {erro && <p className="text-danger mt-2 mb-0">{erro}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={excluir}>Sim</Button>
          <Button variant="primary" onClick={() => setShow(false)}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Linha;
