import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Linha from "../../components/linha";
import { buscarMock, ehMock } from "../../data/mock";
import { useCartoes, useUid } from "../../hooks/useColecoes";
import { carregarColecao } from "../../services/colecoes";
import { normalizar } from "../../utils/jogo";
import EstiloCartao from "./cartao.module.css";

function Cartao() {
  const { idColecao } = useParams();
  const uid = useUid();
  const mock = ehMock(idColecao);
  const somenteLeitura = mock || !uid;

  const [pesquisa, setPesquisa] = useState("");
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const [nomeColecao, setNomeColecao] = useState(mock ? buscarMock(idColecao)?.nome : "");
  const { cartoes, carregando, erro } = useCartoes(idColecao);

  useEffect(() => {
    if (mock) {
      setNomeColecao(buscarMock(idColecao)?.nome || "");
      return;
    }
    carregarColecao(idColecao)
      .then((c) => setNomeColecao(c?.nome || ""))
      .catch(() => setNomeColecao(""));
  }, [idColecao, mock]);

  const filtrados = cartoes.filter((c) =>
    normalizar(c.frente).includes(normalizar(pesquisa))
  );

  return (
    <div>
      <div className={EstiloCartao.containerPrincipal}>
        <span>Coleção{nomeColecao ? ` - ${nomeColecao}` : ""}</span>
        <div className={`${EstiloCartao.inputBusca} input-group`}>
          <div className="input-group-prepend">
            <button className="btn btn-default" tabIndex={-1}>
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

      {!somenteLeitura && (
        <div className={EstiloCartao.novoCartao}>
          <Link to={`/novo-cartao/${idColecao}`} className={EstiloCartao.btn}>
            Novo Cartão
          </Link>
        </div>
      )}

      <main className={EstiloCartao.containerPrincipal}>
        {erro && <p>{erro}</p>}
        {carregando && <p>Carregando...</p>}
        {!carregando && !erro && cartoes.length === 0 && (
          <p>Esta coleção ainda não tem cartões.</p>
        )}
        {cartoes.length > 0 && (
          <div className={EstiloCartao.barraLista}>
            <span>{cartoes.length} {cartoes.length === 1 ? "cartão" : "cartões"} · respostas ocultas</span>
            <button type="button" className={EstiloCartao.mostrarTodas} onClick={() => setMostrarTodas(!mostrarTodas)}>
              <i className={`bi ${mostrarTodas ? "bi-eye-slash" : "bi-eye"}`}></i>{" "}
              {mostrarTodas ? "Ocultar todas" : "Ver todas as respostas"}
            </button>
          </div>
        )}
        {filtrados.map((cartao) => (
          <Linha
            key={cartao.id}
            id={cartao.id}
            frente={cartao.frente}
            verso={cartao.verso}
            idColecao={idColecao}
            somenteLeitura={somenteLeitura}
            mostrarTodas={mostrarTodas}
          />
        ))}

        <div className={EstiloCartao.rodape}>
          <Link className={EstiloCartao.voltar} to="/home">
            <i className="bi bi-arrow-left"></i> Voltar
          </Link>
          {cartoes.length > 0 && (
            <Link className={EstiloCartao.jogar} to={`/jogo/${idColecao}`}>
              <i className="bi bi-play-fill"></i> Jogar!
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

export default Cartao;
