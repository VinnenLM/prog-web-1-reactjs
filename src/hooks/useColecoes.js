import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { COLECOES_MOCK, buscarMock, ehMock } from "../data/mock";
import {
  mensagemErro,
  observarColecoes,
  observarCartoes,
} from "../services/colecoes";

export const useUid = () => useSelector((state) => state.usuarioUid);

export function useColecoes() {
  const uid = useUid();
  const [minhas, setMinhas] = useState([]);
  const [carregando, setCarregando] = useState(!!uid);
  const [erro, setErro] = useState("");

  useEffect(() => {
    setMinhas([]);
    setErro("");
    if (!uid) {
      setCarregando(false);
      return undefined;
    }
    setCarregando(true);
    return observarColecoes(
      uid,
      (dados) => {
        setMinhas(dados);
        setCarregando(false);
      },
      (e) => {
        console.error(e);
        setErro(mensagemErro(e));
        setCarregando(false);
      }
    );
  }, [uid]);

  return { exemplos: COLECOES_MOCK, minhas, carregando, erro, uid };
}

export function useCartoes(idColecao) {
  const uid = useUid();
  const mock = ehMock(idColecao);
  const [cartoes, setCartoes] = useState([]);
  const [carregando, setCarregando] = useState(!mock);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (mock) return undefined;
    if (!uid) {
      setCartoes([]);
      setCarregando(false);
      return undefined;
    }
    setCarregando(true);
    setErro("");
    return observarCartoes(
      idColecao,
      uid,
      (dados) => {
        setCartoes(dados);
        setCarregando(false);
      },
      (e) => {
        console.error(e);
        setErro(mensagemErro(e));
        setCarregando(false);
      }
    );
  }, [idColecao, uid, mock]);

  if (mock) {
    return { cartoes: buscarMock(idColecao)?.cartoes || [], carregando: false, erro: "" };
  }
  return { cartoes, carregando, erro };
}
