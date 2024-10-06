import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { persistor, store } from "./store";

import { PersistGate } from "redux-persist/integration/react";
import NavBar from "./components/navbar";
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

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cadastro" element={<Cadastro />} />
            <Route
              path="/editar-cartao/:idColecao/:idCartao"
              element={<EditarCartao />}
            />
            <Route exact path="/nova-colecao" element={<NovaColecao />} />
            <Route path="/novo-cartao/:idColecao" element={<NovoCartao />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/cartao/:idColecao" element={<Cartao />} />
            <Route exact path="/index" element={<Index />} />
            <Route
              path="/editar-colecao/:idColecao"
              element={<EditarColecao />}
            />
            <Route path="/jogo/:idColecao" element={<JogoCartao />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
