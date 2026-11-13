import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import firestore from "../config/firebase";

const COLECOES = "flashcards";
const CARTOES = "cartoes";

const mapear = (snap) => snap.docs.map((d) => ({ id: d.id, ...d.data() }));

const qColecoes = (uid) =>
  query(collection(firestore, COLECOES), where("uid", "==", uid));

const qCartoes = (idColecao, uid) =>
  query(
    collection(firestore, CARTOES),
    where("idColecao", "==", idColecao),
    where("uid", "==", uid)
  );

// ---------- leitura ----------
export function observarColecoes(uid, aoMudar, aoErrar) {
  return onSnapshot(qColecoes(uid), (s) => aoMudar(mapear(s)), aoErrar);
}

export function observarCartoes(idColecao, uid, aoMudar, aoErrar) {
  return onSnapshot(qCartoes(idColecao, uid), (s) => aoMudar(mapear(s)), aoErrar);
}

export async function carregarColecoes(uid) {
  return mapear(await getDocs(qColecoes(uid)));
}

export async function carregarCartoes(idColecao, uid) {
  return mapear(await getDocs(qCartoes(idColecao, uid)));
}

export async function carregarColecao(id) {
  const snap = await getDoc(doc(firestore, COLECOES, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function carregarCartao(id) {
  const snap = await getDoc(doc(firestore, CARTOES, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// ---------- escrita ----------
export const criarColecao = (uid, dados) =>
  addDoc(collection(firestore, COLECOES), { ...dados, uid });

export const atualizarColecao = (id, dados) =>
  updateDoc(doc(firestore, COLECOES, id), dados);

// Apaga a coleção e todos os cartões dela.
export async function excluirColecao(id, uid) {
  const cartoes = await getDocs(qCartoes(id, uid));
  const lote = writeBatch(firestore);
  cartoes.forEach((c) => lote.delete(c.ref));
  lote.delete(doc(firestore, COLECOES, id));
  await lote.commit();
}

export const criarCartao = (uid, idColecao, dados) =>
  addDoc(collection(firestore, CARTOES), { ...dados, idColecao, uid });

export const atualizarCartao = (id, dados) =>
  updateDoc(doc(firestore, CARTOES, id), dados);

export const excluirCartao = (id) => deleteDoc(doc(firestore, CARTOES, id));

export function mensagemErro(e) {
  if (e?.code === "permission-denied")
    return "Sem permissão para acessar os dados. Confira as regras do Firestore (veja o README).";
  if (e?.code === "unavailable")
    return "Sem conexão com o servidor. Tente novamente em instantes.";
  return "Não foi possível concluir a operação. Tente novamente.";
}
