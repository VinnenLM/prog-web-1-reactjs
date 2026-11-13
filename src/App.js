import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import NavBar from "./components/navbar";
import { auth } from "./config/firebase";
import { persistor, store } from "./store";
import Cadastro from "./view/cadastro";
import Cartao from "./view/cartao";
import EditarCartao from "./view/editar-cartao";
import EditarColecao from "./view/editar-colecao";
import Home from "./view/home";
import Index from "./view/index";
import JogoCartao from "./view/jogo-cartao";
import Login from "./view/login";
import NovaColecao from "./view/nova-colecao";
import NovoCartao from "./view/novo-cartao";

// Rotas que exigem login.
function Protegida({ children }) {
  const logado = useSelector((state) => state.usuarioLogado > 0);
  return logado ? children : <Navigate to="/login" replace />;
}

function Rotas() {
  const dispatch = useDispatch();
  const [pronto, setPronto] = useState(false);

  // Mantém a store sincronizada com a sessão real do Firebase Auth.
  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        dispatch({
          type: "LOGIN",
          usuarioEmail: usuario.email,
          usuarioUid: usuario.uid,
        });
      } else {
        dispatch({ type: "LOGOUT" });
      }
      setPronto(true);
    });
    return cancelar;
  }, [dispatch]);

  if (!pronto) return <p style={{ textAlign: "center", marginTop: "3rem" }}>Carregando...</p>;

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cartao/:idColecao" element={<Cartao />} />
        <Route path="/jogo" element={<JogoCartao />} />
        <Route path="/jogo/:idColecao" element={<JogoCartao />} />
        <Route path="/nova-colecao" element={<Protegida><NovaColecao /></Protegida>} />
        <Route path="/editar-colecao/:idColecao" element={<Protegida><EditarColecao /></Protegida>} />
        <Route path="/novo-cartao/:idColecao" element={<Protegida><NovoCartao /></Protegida>} />
        <Route path="/editar-cartao/:idColecao/:idCartao" element={<Protegida><EditarCartao /></Protegida>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Rotas />
      </PersistGate>
    </Provider>
  );
}

export default App;
