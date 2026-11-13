export function normalizar(texto = "") {
  return String(texto)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "");
}

export function respostaCorreta(cartao, resposta) {
  const r = normalizar(resposta);
  if (!r) return false;
  return [cartao.verso, ...(cartao.aceitas || [])].some(
    (v) => normalizar(v) === r
  );
}

export function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
