import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Linha from "../../components/linha";
import firestore from "../../config/firebase";
import EstiloCartao from "./cartao.module.css";

function Cartao() {
  const [meusCartoes, setMeusCartoes] = useState([]);
  const [minhaColecao, setMinhaColecao] = useState([]);
  const [pesquisa, setPesquisa] = useState([]);

  const { idColecao } = useParams();

  useEffect(() => {
    const cartao = [];
    const colecao = [];

    const qCartao = query(
      collection(firestore, "cartoes"),
      where("idColecao", "==", idColecao)
    );
    const qColecao = query(
      collection(firestore, "flashcards"),
      where(documentId(), "==", idColecao)
    );

    onSnapshot(qCartao, (result) => {
      result.forEach((doc) => {
        if (doc.data().frente.indexOf(pesquisa) >= 0) {
          const myDoc = {
            ...doc.data(),
            id: doc.id,
          };
          cartao.push(myDoc);
        }
      });

      setMeusCartoes(cartao);
    });

    onSnapshot(qColecao, (result) => {
      result.forEach((doc) => {
        const myDoc = {
          ...doc.data(),
          id: doc.id,
        };
        colecao.push(myDoc);
      });

      setMinhaColecao(colecao);
    });
  }, [idColecao, pesquisa]);

  return (
    <div>
      <div className={EstiloCartao.containerPrincipal}>
        {minhaColecao.map((colecao) => (
          <span>Coleção - {colecao.nome}</span>
        ))}
        <div className={`${EstiloCartao.inputBusca} input-group`}>
          <div className="input-group-prepend">
            <button className="btn btn-default">
              <i className="bi bi-search"></i>
            </button>
          </div>
          <input
            onChange={(evt) => setPesquisa(evt.target.value)}
            className="form-control"
            type="text"
            placeholder="Busque por um elemento"
          />
        </div>
      </div>

      <div className={EstiloCartao.novoCartao}>
        <Link to={`/novo-cartao/${idColecao}`} className={EstiloCartao.btn}>
          Novo Cartão
        </Link>
      </div>

      <main className={EstiloCartao.containerPrincipal}>
        {meusCartoes.map((cartao) => (
          <Linha
            id={cartao.id}
            frente={cartao.frente}
            verso={cartao.verso}
            idColecao={idColecao}
          />
        ))}

        <div className="d-flex">
          <Link
            className={`${EstiloCartao.btn} btn btn-success`}
            id={EstiloCartao.salvar}
            to={`/jogo/${idColecao}`}
            style={{ borderColor: "white" }}
          >
            Jogar!
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Cartao;
