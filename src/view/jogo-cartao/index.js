import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firestore from "../../config/firebase";
import "./index.css";

const JogoCartao = () => {
  const { idColecao } = useParams();
  const [meusCartoes, setMeusCartoes] = useState([]);
  const [cartaoAtual, setCartaoAtual] = useState(0);
  const [resposta, setResposta] = useState("");
  const [pontuacao, setPontuacao] = useState(0);
  const [exibirResultado, setExibirResultado] = useState(false);

  useEffect(() => {
    const cartoes = [];
    const qCartao = query(
      collection(firestore, "cartoes"),
      where("idColecao", "==", idColecao)
    );

    onSnapshot(qCartao, (result) => {
      result.forEach((doc) => {
        const myDoc = {
          ...doc.data(),
          id: doc.id,
        };
        cartoes.push(myDoc);
      });
      setMeusCartoes(cartoes);
    });
  }, [idColecao]);

  const verificarResposta = () => {
    if (
      resposta.toLowerCase() === meusCartoes[cartaoAtual].verso.toLowerCase()
    ) {
      setPontuacao(pontuacao + 1);
    }

    if (cartaoAtual < meusCartoes.length - 1) {
      setCartaoAtual(cartaoAtual + 1);
      setResposta("");
    } else {
      setExibirResultado(true);
    }
  };

  if (exibirResultado) {
    return (
      <div className="containerResultado">
        <h2 className="titulo">Pontuação Final</h2>
        <h3 className="sub-titulo">
          {pontuacao} / {meusCartoes.length}
        </h3>
        <button
          className="botaoNovamente"
          onClick={() => {
            setExibirResultado(false);
            setCartaoAtual(0);
            setPontuacao(0);
          }}
        >
          Jogar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="containerPrincipal">
      {meusCartoes.length > 0 ? (
        <div className="cartao jogo">
          <h3 className="cartaoFrente">{meusCartoes[cartaoAtual].frente}</h3>
          <input
            className="inputNomes"
            type="text"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            placeholder="Digite o verso"
          />
          <button className="btn" onClick={verificarResposta}>
            Verificar
          </button>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default JogoCartao;
