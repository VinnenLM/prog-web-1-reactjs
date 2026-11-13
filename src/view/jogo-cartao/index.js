import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { COLECOES_MOCK, buscarMock, ehMock } from "../../data/mock";
import { useUid } from "../../hooks/useColecoes";
import {
  carregarCartoes,
  carregarColecao,
  carregarColecoes,
  mensagemErro,
} from "../../services/colecoes";
import { embaralhar, respostaCorreta } from "../../utils/jogo";
import "./index.css";

// Carrega os cartões da coleção pedida ou, sem idColecao, de TODAS
// (exemplos + coleções do usuário logado).
async function carregarBaralho(idColecao, uid) {
  if (idColecao) {
    if (ehMock(idColecao)) {
      const c = buscarMock(idColecao);
      return {
        titulo: c?.nome || "Coleção",
        cartoes: (c?.cartoes || []).map((k) => ({ ...k, colecao: c.nome })),
      };
    }
    const [c, cartoes] = await Promise.all([
      carregarColecao(idColecao),
      carregarCartoes(idColecao, uid),
    ]);
    return {
      titulo: c?.nome || "Coleção",
      cartoes: cartoes.map((k) => ({ ...k, colecao: c?.nome || "Coleção" })),
    };
  }

  let cartoes = COLECOES_MOCK.flatMap((c) =>
    c.cartoes.map((k) => ({ ...k, colecao: c.nome }))
  );
  if (uid) {
    const minhas = await carregarColecoes(uid);
    const lotes = await Promise.all(
      minhas.map(async (c) =>
        (await carregarCartoes(c.id, uid)).map((k) => ({ ...k, colecao: c.nome }))
      )
    );
    cartoes = [...lotes.flat(), ...cartoes];
  }
  return { titulo: "Todas as coleções", cartoes };
}

const JogoCartao = () => {
  const { idColecao } = useParams();
  const uid = useUid();

  const [fase, setFase] = useState("carregando"); // carregando | jogando | resultado | vazio | erro
  const [titulo, setTitulo] = useState("");
  const [erro, setErro] = useState("");
  const [baralho, setBaralho] = useState([]);
  const [indice, setIndice] = useState(0);
  const [resposta, setResposta] = useState("");
  const [feedback, setFeedback] = useState(null); // { correto, esperado }
  const [historico, setHistorico] = useState([]);
  const entrada = useRef(null);

  const iniciar = useCallback((cartoes) => {
    setBaralho(embaralhar(cartoes));
    setIndice(0);
    setResposta("");
    setFeedback(null);
    setHistorico([]);
    setFase(cartoes.length ? "jogando" : "vazio");
  }, []);

  useEffect(() => {
    let cancelado = false;
    setFase("carregando");
    carregarBaralho(idColecao, uid)
      .then(({ titulo, cartoes }) => {
        if (cancelado) return;
        setTitulo(titulo);
        iniciar(cartoes);
      })
      .catch((e) => {
        if (cancelado) return;
        console.error(e);
        setErro(mensagemErro(e));
        setFase("erro");
      });
    return () => {
      cancelado = true;
    };
  }, [idColecao, uid, iniciar]);

  useEffect(() => {
    if (fase === "jogando" && !feedback) entrada.current?.focus();
  }, [fase, indice, feedback]);

  const cartao = baralho[indice];

  const registrar = (correto, dada) => {
    setFeedback({ correto, esperado: cartao.verso });
    setHistorico((h) => [...h, { cartao, correto, dada }]);
  };

  const verificar = () => {
    if (feedback) return;
    registrar(respostaCorreta(cartao, resposta), resposta);
  };

  const naoSei = () => {
    if (!feedback) registrar(false, "");
  };

  const proximo = () => {
    if (indice < baralho.length - 1) {
      setIndice(indice + 1);
      setResposta("");
      setFeedback(null);
    } else {
      setFase("resultado");
    }
  };

  const aoDigitar = (evt) => {
    if (evt.key === "Enter" && !feedback) verificar();
  };

  // Depois da correção, Enter avança para o próximo cartão.
  useEffect(() => {
    if (!feedback) return undefined;
    const aoTeclar = (evt) => {
      if (evt.key === "Enter" && !evt.repeat) {
        evt.preventDefault();
        proximo();
      }
    };
    // Adiciona só depois do evento atual terminar, para o mesmo Enter
    // que verificou a resposta não avançar o cartão também.
    const t = setTimeout(() => window.addEventListener("keydown", aoTeclar), 0);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", aoTeclar);
    };
  });

  if (fase === "carregando") {
    return <div className="jg-container"><p>Carregando...</p></div>;
  }

  if (fase === "erro") {
    return (
      <div className="jg-container">
        <p>{erro}</p>
        <Link className="jg-btn" to="/home">Voltar</Link>
      </div>
    );
  }

  if (fase === "vazio") {
    return (
      <div className="jg-container">
        <h2 className="jg-titulo">{titulo}</h2>
        <p>Não há cartões para jogar ainda.</p>
        <Link className="jg-btn" to="/home">Voltar às coleções</Link>
      </div>
    );
  }

  if (fase === "resultado") {
    const acertos = historico.filter((h) => h.correto).length;
    const total = baralho.length;
    const pct = Math.round((acertos / total) * 100);
    const erros = historico.filter((h) => !h.correto);
    const porColecao = {};
    historico.forEach((h) => {
      const g = (porColecao[h.cartao.colecao] ||= { acertos: 0, total: 0 });
      g.total += 1;
      if (h.correto) g.acertos += 1;
    });
    const mensagem =
      pct === 100 ? "Perfeito! 🏆" : pct >= 70 ? "Muito bem! 🎉" : pct >= 40 ? "Bom treino! 💪" : "Continue praticando! 📚";

    return (
      <div className="jg-resultado">
        <h2 className="jg-titulo">Pontuação Final</h2>
        <p className="jg-subtitulo">{titulo}</p>
        <div className="jg-pontos">
          {acertos} / {total}
        </div>
        <p className="jg-pct">{pct}% de acertos — {mensagem}</p>

        {Object.keys(porColecao).length > 1 && (
          <ul className="jg-lista">
            {Object.entries(porColecao).map(([nome, g]) => (
              <li key={nome}>
                <span>{nome}</span>
                <strong>{g.acertos}/{g.total}</strong>
              </li>
            ))}
          </ul>
        )}

        {erros.length > 0 && (
          <div className="jg-revisao">
            <h4>Para revisar</h4>
            <ul>
              {erros.map((h) => (
                <li key={h.cartao.id}>
                  <strong>{h.cartao.frente}</strong> → {h.cartao.verso}
                  {h.dada && <span className="jg-sua"> (você: {h.dada})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="jg-botoes">
          <button className="jg-btn" onClick={() => iniciar(baralho)}>
            Jogar Novamente
          </button>
          <Link className="jg-btn jg-sec" to={idColecao ? `/cartao/${idColecao}` : "/home"}>
            Voltar às coleções
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="jg-container">
      <p className="jg-nome">{titulo}</p>
      <div className="jg-barra">
        <div className="jg-barra-fill" style={{ width: `${(indice / baralho.length) * 100}%` }} />
      </div>
      <p className="jg-contador">
        Cartão {indice + 1} de {baralho.length}
        {!idColecao && <span> · {cartao.colecao}</span>}
      </p>

      <div className={`jg-cartao ${feedback ? (feedback.correto ? "ok" : "err") : ""}`}>
        <h3 className="jg-frente">{cartao.frente}</h3>
        <input
          ref={entrada}
          className="jg-input"
          type="text"
          value={resposta}
          readOnly={!!feedback}
          onChange={(e) => setResposta(e.target.value)}
          onKeyDown={aoDigitar}
          placeholder="Digite o verso"
        />

        {feedback ? (
          <>
            <p className={feedback.correto ? "jg-certo" : "jg-errado"}>
              {feedback.correto ? "Correto! ✅" : `Resposta: ${feedback.esperado}`}
            </p>
            <button className="jg-btn" onClick={proximo}>
              {indice < baralho.length - 1 ? "Próximo" : "Ver pontuação"}
            </button>
            <p className="jg-dica">ou pressione Enter</p>
          </>
        ) : (
          <div className="jg-acoes">
            <button className="jg-btn" onClick={verificar}>Verificar</button>
            <button className="jg-btn jg-sec" onClick={naoSei}>Não sei</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JogoCartao;
